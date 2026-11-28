import { OllamaUnavailableError } from "./ollama"

/** Maps a server-side AI failure to a JSON response: 503 when local Ollama is off, 500 otherwise. */
export function aiErrorResponse(err: unknown) {
  const message = err instanceof Error ? err.message : "Unknown error"
  const status = err instanceof OllamaUnavailableError ? 503 : 500
  return Response.json({ error: message }, { status })
}
