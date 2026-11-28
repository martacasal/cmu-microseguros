"use client"

import * as React from "react"
import { Chip, ChatBubble } from "@/components/pulse"
import { href } from "../types"
import { HistoryBackButton } from "./back-button"
import { ASSISTANT, ChatScreen, ChipLink, Chips } from "../f11/_parts"

/**
 * 13.2 Assistant · my insurance · Figma 254:3854
 * Live chat with the local Ollama model through /api/assistant. When Ollama can't be reached
 * (Vercel, a machine without Ollama), it falls back to the scripted answers.
 */
const TOPICS: Record<string, string> = {
  "A past session": "Can you tell me about my last session?",
  "Cover and prices": "Does my health insurance already cover football?",
  Invoices: "Where do I find my invoices?",
  "My details": "How do I change my personal details?",
}

const SCRIPTED =
  "It depends on your policy. PULSE pays treatment costs after an accident during the activity, up to [AMOUNT]. Want a person to look at your case?"
const OFFLINE = "The assistant is offline right now. A person from our team can help."

type Message = { role: "user" | "assistant"; content: string }

/** A reply cut off by the length limit ends mid-sentence: keep it up to the last full sentence. */
function tidy(text: string) {
  const t = text.trim()
  if (/[.!?…)"]$/.test(t)) return t
  const end = Math.max(t.lastIndexOf(". "), t.lastIndexOf("! "), t.lastIndexOf("? "))
  return end > 0 ? t.slice(0, end + 1) : t
}

export default function AssistantMyInsurance() {
  const [topic, setTopic] = React.useState<string | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [pending, setPending] = React.useState(false)
  const offline = React.useRef(false)
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  const setLast = (content: string) =>
    setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }])

  const ask = async (question: string, fromTopic = false) => {
    if (pending) return
    const thread: Message[] = [...messages, { role: "user", content: question }]
    setMessages([...thread, { role: "assistant", content: "" }])

    const fallback = () => setLast(fromTopic ? SCRIPTED : OFFLINE)
    if (offline.current) return fallback()

    setPending(true)
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: thread }),
      })
      if (!res.ok || !res.body) {
        if (res.status === 503) offline.current = true
        return fallback()
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let text = ""
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setLast(text)
      }
      setLast(tidy(text) || OFFLINE)
    } catch {
      offline.current = true
      fallback()
    } finally {
      setPending(false)
    }
  }

  const last = messages[messages.length - 1]
  const answered = !pending && last?.role === "assistant" && last.content !== ""

  return (
    <ChatScreen
      left={<HistoryBackButton fallback={href("13-1")} />}
      title="Assistant"
      gap="gap-3"
      placeholder="Type or dictate your question"
      onSend={(t) => ask(t)}
      composerDisabled={pending}
    >
      <ChatBubble from="assistant" who={ASSISTANT}>
        Hi, Rafa. I&apos;m PULSE&apos;s automated assistant, not a person. What&apos;s your question about?
      </ChatBubble>
      <div className="flex flex-wrap gap-2">
        {Object.entries(TOPICS).map(([label, question]) => (
          <Chip
            key={label}
            selected={topic === label}
            disabled={pending}
            onClick={() => {
              setTopic(label)
              ask(question, true)
            }}
          >
            {label}
          </Chip>
        ))}
      </div>
      {messages.map((m, i) =>
        m.role === "user" ? (
          <ChatBubble key={i} from="you" who="You">
            {m.content}
          </ChatBubble>
        ) : (
          <ChatBubble key={i} from="assistant" who={ASSISTANT}>
            {m.content || (
              <span aria-label="Assistant is typing" className="inline-flex gap-1 py-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-bounce rounded-full bg-text-secondary"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </span>
            )}
          </ChatBubble>
        )
      )}
      {answered && (
        <Chips>
          <ChipLink href={href("13-3")}>Talk to a person</ChipLink>
          <ChipLink href={href("04-1")}>Got it</ChipLink>
        </Chips>
      )}
      <div ref={endRef} />
    </ChatScreen>
  )
}
