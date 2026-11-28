import { DEFAULT_MODEL, listModels } from "@/lib/ai/ollama"

export const dynamic = "force-dynamic"

/** GET → models installed in the local Ollama. `available: false` when Ollama is off. */
export async function GET() {
  try {
    const models = await listModels()
    return Response.json({ available: true, models, default: DEFAULT_MODEL })
  } catch (err) {
    return Response.json({
      available: false,
      models: [],
      default: DEFAULT_MODEL,
      error: err instanceof Error ? err.message : "Ollama unavailable",
    })
  }
}
