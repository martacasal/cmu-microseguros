"use client"

import * as React from "react"
import { InfoCard } from "@/components/pulse"
import { getChosenModel } from "@/components/ai/model"
import { PriceBars } from "./_parts"

type Explanation = {
  factors: { label: string; weight: number; why: string }[]
  notUsed: string[]
  summary: string
  model: string
}

/** Sample session the quote screens show (06.1): football, 1h 20, gear added. */
const SESSION = { activity: "Football", duration: "1 h 20 min", place: "Public park in Lisbon", gear: true }

/**
 * 06.3 explained by the local Ollama model. Renders `fallback` (the static design) while it loads
 * and whenever local AI isn't available.
 */
export function AiPriceExplainer({ fallback }: { fallback: React.ReactNode }) {
  const [state, setState] = React.useState<"loading" | "done" | "error">("loading")
  const [data, setData] = React.useState<Explanation | null>(null)

  React.useEffect(() => {
    const ctrl = new AbortController()
    fetch("/api/ai/explain-price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...SESSION, model: getChosenModel() }),
      signal: ctrl.signal,
    })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || `HTTP ${r.status}`)
        return r.json() as Promise<Explanation>
      })
      .then((d) => {
        setData(d)
        setState("done")
      })
      .catch((err) => {
        if (err.name === "AbortError") return
        console.error("[local-ai]", err)
        setState("error")
      })
    return () => ctrl.abort()
  }, [])

  if (state !== "done" || !data) {
    return (
      <>
        {state === "loading" && (
          <span className="w-fit animate-pulse rounded-2xl bg-surface-muted px-3 py-[7px] text-[12px] leading-[1.32] font-semibold">
            AI · preparing the explanation
          </span>
        )}
        {fallback}
      </>
    )
  }

  return (
    <>
      <PriceBars
        title="It depends on four things"
        rows={data.factors.map((f) => ({ label: f.label, fill: f.weight, value: `${Math.round(f.weight * 100)}%` }))}
      />
      <div className="flex flex-col gap-2 rounded-[28px] bg-surface-card px-5 py-[18px]">
        {data.summary && <p className="text-[15px] leading-[1.32] font-semibold text-text-primary">{data.summary}</p>}
        {data.factors.map((f) => (
          <p key={f.label} className="text-[14px] leading-[1.32] text-text-secondary">
            <span className="font-semibold text-text-primary">{f.label}.</span> {f.why}
          </p>
        ))}
      </div>
      <InfoCard variant="brand" title="What doesn't count" description={`${data.notUsed.join(", ")} never change the price.`} />
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        Explanation generated automatically by a local model ({data.model}). It can be wrong.
      </p>
    </>
  )
}
