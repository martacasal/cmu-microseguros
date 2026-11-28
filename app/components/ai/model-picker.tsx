"use client"

import * as React from "react"
import { getChosenModel, setChosenModel } from "./model"

type ModelsResponse = { available: boolean; models: string[]; default: string }

/** Toolbar select for the local Ollama model. Shows "Ollama offline" when it can't be reached. */
export function ModelPicker() {
  const [data, setData] = React.useState<ModelsResponse | null>(null)
  const [value, setValue] = React.useState<string>("")

  React.useEffect(() => {
    let alive = true
    fetch("/api/ai/models")
      .then((r) => r.json() as Promise<ModelsResponse>)
      .then((d) => {
        if (!alive) return
        setData(d)
        const saved = getChosenModel()
        setValue(saved && d.models.includes(saved) ? saved : d.default)
      })
      .catch(() => alive && setData({ available: false, models: [], default: "" }))
    return () => {
      alive = false
    }
  }, [])

  if (!data) return <span className="opacity-60">Local AI…</span>
  if (!data.available) {
    return (
      <span className="flex items-center gap-1.5" title="Start it with: ollama serve">
        <span className="size-2 rounded-full bg-red-400" aria-hidden /> Ollama offline
      </span>
    )
  }
  return (
    <label className="flex items-center gap-2 whitespace-nowrap">
      <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
      <span className="font-semibold">Local AI</span>
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setChosenModel(e.target.value)
        }}
        className="h-8 rounded-full bg-white/10 px-3 text-white outline-none [&>option]:text-black"
      >
        {!data.models.includes(data.default) && <option value={data.default}>{data.default} (not installed)</option>}
        {data.models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </label>
  )
}
