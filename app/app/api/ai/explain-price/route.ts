import { aiErrorResponse } from "@/lib/ai/errors"
import { chatJson, resolveModel } from "@/lib/ai/ollama"
import { NEVER_USED, PRICE_SCHEMA, priceSystemPrompt } from "@/lib/ai/prompts"

type Factor = { label: string; weight: number; why: string }

const LABELS = ["Activity", "Duration", "Place", "Gear"]
const str = (v: unknown, fallback: string) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 80) : fallback)

/** POST { activity, duration, place, gear, model? } → { factors, notUsed, summary, model } */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const session = {
      activity: str(body.activity, "Mountain biking"),
      duration: str(body.duration, "1 h 20 min"),
      place: str(body.place, "Serra de Sintra"),
      gear: body.gear === true ? "yes, gear cover added" : "no gear cover",
    }
    const model = await resolveModel(body.model)
    const out = await chatJson<{ factors?: Factor[]; summary?: string }>(
      [
        { role: "system", content: priceSystemPrompt() },
        {
          role: "user",
          content: `Session: activity ${session.activity}; duration ${session.duration}; place ${session.place}; gear: ${session.gear}.`,
        },
      ],
      PRICE_SCHEMA,
      model,
      request.signal
    )
    // Keep exactly the four allowed factors, in order, with weights clamped to 0..1.
    const factors = LABELS.map((label) => {
      const f = out.factors?.find((x) => x.label === label)
      return {
        label,
        weight: Math.min(1, Math.max(0, Number(f?.weight) || 0)),
        why: typeof f?.why === "string" ? f.why : "",
      }
    })
    // Guardrail: these are always listed as not used, whatever the model says.
    return Response.json({ factors, notUsed: NEVER_USED, summary: out.summary ?? "", model })
  } catch (err) {
    return aiErrorResponse(err)
  }
}
