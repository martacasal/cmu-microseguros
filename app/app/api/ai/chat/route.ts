import { aiErrorResponse } from "@/lib/ai/errors"
import { chatStream, resolveModel, type ChatMessage } from "@/lib/ai/ollama"
import { assistantSystemPrompt } from "@/lib/ai/prompts"

/** POST { messages, model? } → the assistant's reply streamed as plain text (local Ollama only). */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown; model?: unknown }
    const history = Array.isArray(body.messages) ? body.messages : []
    const messages: ChatMessage[] = history
      .filter(
        (m): m is ChatMessage =>
          !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return Response.json({ error: "Send at least one user message." }, { status: 400 })
    }
    const model = await resolveModel(body.model)
    const stream = await chatStream(
      [{ role: "system", content: assistantSystemPrompt() }, ...messages],
      model,
      request.signal
    )
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Model": model },
    })
  } catch (err) {
    return aiErrorResponse(err)
  }
}
