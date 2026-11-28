import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/assistant-prompt"

/**
 * POST /api/assistant — chat with the local Ollama model for 13.2.
 * Body: { messages: { role: "user" | "assistant"; content: string }[] }
 * Streams the reply back as plain text. Answers 503 { offline: true } when Ollama can't be
 * reached (e.g. on Vercel), so the screen can fall back to its scripted answers.
 */
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2:1b"
const MAX_MESSAGES = 10
const MAX_CHARS = 1000
const CONNECT_TIMEOUT_MS = 3000

type Message = { role: "user" | "assistant"; content: string }

const offline = () => Response.json({ offline: true }, { status: 503 })

function clean(body: unknown): Message[] | null {
  const list = (body as { messages?: unknown })?.messages
  if (!Array.isArray(list)) return null
  const messages = list
    .filter(
      (m): m is Message =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== ""
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
  return messages.length && messages[messages.length - 1].role === "user" ? messages : null
}

export async function POST(request: Request) {
  const messages = clean(await request.json().catch(() => null))
  if (!messages) return Response.json({ error: "Send at least one user message." }, { status: 400 })

  // Fail fast if Ollama isn't there. The chat call itself gets no timeout: loading the model
  // the first time can take several seconds before the first word.
  const reachable = await fetch(`${OLLAMA_URL}/api/version`, { signal: AbortSignal.timeout(CONNECT_TIMEOUT_MS) })
    .then((r) => r.ok)
    .catch(() => false)
  if (!reachable) return offline()

  const controller = new AbortController()
  request.signal.addEventListener("abort", () => controller.abort())

  let upstream: Response
  try {
    upstream = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: true,
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...messages],
        options: { temperature: 0.3, num_predict: 160 },
      }),
      signal: controller.signal,
    })
  } catch {
    return offline()
  }
  if (!upstream.ok || !upstream.body) return offline()

  // Ollama streams NDJSON ({ message: { content }, done }); pass on just the text.
  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""
  const stream = new ReadableStream<Uint8Array>({
    async pull(out) {
      const { value, done } = await reader.read().catch(() => ({ value: undefined, done: true as const }))
      if (done) {
        out.close()
        return
      }
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() ?? ""
      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const chunk = JSON.parse(line) as { message?: { content?: string } }
          if (chunk.message?.content) out.enqueue(encoder.encode(chunk.message.content))
        } catch {
          // ignore a malformed line
        }
      }
    },
    cancel() {
      controller.abort()
      reader.cancel().catch(() => {})
    },
  })

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  })
}
