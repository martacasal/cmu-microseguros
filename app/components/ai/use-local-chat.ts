"use client"

import * as React from "react"
import { getChosenModel } from "./model"

/** Must match HANDOVER in lib/ai/prompts.ts (kept here so no server code is bundled into the client). */
const HANDOVER = "HANDOVER:"

export type LiveMessage = {
  role: "user" | "assistant"
  content: string
  /** assistant only: the model said it can't answer → hand over to a person */
  handover?: boolean
  /** assistant only: generation stopped by the person */
  stopped?: boolean
  error?: boolean
}

export type ChatStatus = "idle" | "thinking" | "streaming"

/** Talks to /api/ai/chat (local Ollama) and streams the reply into the last assistant message. */
export function useLocalChat() {
  const [messages, setMessages] = React.useState<LiveMessage[]>([])
  const [status, setStatus] = React.useState<ChatStatus>("idle")
  const abortRef = React.useRef<AbortController | null>(null)

  const updateLast = (patch: Partial<LiveMessage>) =>
    setMessages((m) => [...m.slice(0, -1), { ...m[m.length - 1], ...patch }])

  const send = React.useCallback(
    async (text: string) => {
      if (abortRef.current) return
      const history: LiveMessage[] = [...messages, { role: "user", content: text }]
      setMessages([...history, { role: "assistant", content: "" }])
      setStatus("thinking")
      const ctrl = new AbortController()
      abortRef.current = ctrl
      let full = ""
      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: getChosenModel(),
            messages: history.filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
          }),
          signal: ctrl.signal,
        })
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Request failed (${res.status})`)
        }
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          full += decoder.decode(value, { stream: true })
          setStatus("streaming")
          const trimmed = full.trimStart()
          // Hold back text while it could still be the start of the handover marker.
          if (HANDOVER.startsWith(trimmed)) continue
          if (trimmed.startsWith(HANDOVER)) {
            updateLast({ content: trimmed.slice(HANDOVER.length).trim(), handover: true })
          } else {
            updateLast({ content: full })
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          updateLast({ stopped: true })
        } else {
          console.error("[local-ai]", err)
          updateLast({ content: "The assistant isn't available right now.", error: true })
        }
      } finally {
        abortRef.current = null
        setStatus("idle")
      }
    },
    [messages]
  )

  const stop = React.useCallback(() => abortRef.current?.abort(), [])

  React.useEffect(() => () => abortRef.current?.abort(), [])

  return { messages, status, send, stop }
}
