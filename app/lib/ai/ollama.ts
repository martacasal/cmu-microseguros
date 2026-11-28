/**
 * Server code only (imported by the /api/ai route handlers).
 *
 * Local-only Ollama client. The app never talks to a cloud model: the base URL must be a loopback
 * address, and a model is used only if this machine's Ollama lists it.
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string }

const LOOPBACK = new Set(["127.0.0.1", "localhost", "::1", "[::1]"])

export const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "gemma4:e4b"

export class OllamaUnavailableError extends Error {}

export function ollamaBaseUrl(): string {
  const raw = process.env.OLLAMA_URL || "http://127.0.0.1:11434"
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new Error(`OLLAMA_URL is not a valid URL: ${raw}`)
  }
  if (!LOOPBACK.has(url.hostname)) {
    throw new Error(`OLLAMA_URL must point to this machine (127.0.0.1, localhost or ::1), got ${url.hostname}`)
  }
  return url.origin
}

async function ollamaFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = ollamaBaseUrl()
  let res: Response
  try {
    res = await fetch(`${base}${path}`, { ...init, cache: "no-store" })
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err
    throw new OllamaUnavailableError("Ollama isn't running on this machine. Start it with `ollama serve`.")
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Ollama ${path} failed (${res.status}): ${text.slice(0, 200)}`)
  }
  return res
}

export async function listModels(): Promise<string[]> {
  const res = await ollamaFetch("/api/tags")
  const data = (await res.json()) as { models?: { name: string }[] }
  return (data.models ?? []).map((m) => m.name)
}

/** Use the requested model only if it is installed locally; otherwise the default. */
export async function resolveModel(requested?: unknown): Promise<string> {
  if (typeof requested !== "string" || !requested) return DEFAULT_MODEL
  const models = await listModels()
  return models.includes(requested) ? requested : DEFAULT_MODEL
}

/** Streams the assistant's text as it is generated (Ollama NDJSON → plain text). */
export async function chatStream(
  messages: ChatMessage[],
  model: string,
  signal?: AbortSignal
): Promise<ReadableStream<Uint8Array>> {
  const res = await ollamaFetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: true, think: false, options: { temperature: 0.2 } }),
    signal,
  })
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read()
        if (done) {
          controller.close()
          return
        }
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""
        for (const line of lines) {
          if (!line.trim()) continue
          const chunk = JSON.parse(line) as { message?: { content?: string }; error?: string }
          if (chunk.error) throw new Error(chunk.error)
          const text = chunk.message?.content
          if (text) controller.enqueue(encoder.encode(text))
        }
      } catch (err) {
        controller.error(err)
      }
    },
    cancel() {
      reader.cancel().catch(() => {})
    },
  })
}

/** One-shot call that returns JSON matching `schema` (Ollama structured outputs). */
export async function chatJson<T>(messages: ChatMessage[], schema: object, model: string, signal?: AbortSignal): Promise<T> {
  const res = await ollamaFetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: false, think: false, format: schema, options: { temperature: 0 } }),
    signal,
  })
  const data = (await res.json()) as { message?: { content?: string } }
  return JSON.parse(data.message?.content ?? "{}") as T
}
