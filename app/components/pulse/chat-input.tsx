"use client"

import * as React from "react"
import { cn } from "cn"
import { Icon } from "./icon"
import { RoundButton } from "./round-button"
import { TextField } from "./text-field"

/** The bit of the Web Speech API this uses (not in TypeScript's DOM types). */
type Recognition = {
  lang: string
  interimResults: boolean
  continuous: boolean
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}
type RecognitionCtor = new () => Recognition

function getRecognition(): RecognitionCtor | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

const iconButton = "size-10 transition-colors"

/**
 * Chat input (v2/Input "Message"): labelled 56px field with a 40px dictate (mic) button and a navy
 * send button inside it on the right. Enter or send sends and clears the field. The mic fills
 * the field with what you say (browser speech recognition) and turns red while listening.
 * In ChatScreen it's pinned to the bottom of the screen.
 */
function ChatInput({
  label = "Message",
  placeholder = "Type or dictate your message",
  onSend,
  disabled = false,
  lang = "en-US",
  className,
}: {
  label?: string
  placeholder?: string
  onSend: (text: string) => void
  /** e.g. while the assistant is still answering: typing works, sending waits */
  disabled?: boolean
  /** dictation language */
  lang?: string
  className?: string
}) {
  const [text, setText] = React.useState("")
  const [listening, setListening] = React.useState(false)
  const [notice, setNotice] = React.useState<string | null>(null)
  const recognition = React.useRef<Recognition | null>(null)
  // What was in the field when dictation started; the transcript is added after it.
  const before = React.useRef("")

  const stopListening = React.useCallback(() => {
    recognition.current?.stop()
  }, [])

  React.useEffect(() => () => recognition.current?.abort(), [])

  const startListening = () => {
    const Ctor = getRecognition()
    if (!Ctor) {
      setNotice("Dictation isn't available in this browser. Type your question instead.")
      return
    }
    const r = new Ctor()
    r.lang = lang
    r.interimResults = true
    r.continuous = false
    before.current = text.trim() ? `${text.trim()} ` : ""
    let finalText = ""
    r.onresult = (e) => {
      let interim = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const piece = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += piece
        else interim += piece
      }
      setText(before.current + finalText + interim)
    }
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setNotice("Allow microphone access to dictate.")
      } else if (e.error !== "aborted" && e.error !== "no-speech") {
        setNotice("Couldn't hear that. Try again or type your question.")
      }
    }
    r.onend = () => {
      setListening(false)
      recognition.current = null
    }
    recognition.current = r
    setNotice(null)
    setListening(true)
    r.start()
  }

  const send = () => {
    const t = text.trim()
    if (!t || disabled) return
    stopListening()
    onSend(t)
    setText("")
  }

  const canSend = text.trim() !== "" && !disabled

  return (
    <form
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
    >
      <TextField
        label={label}
        placeholder={listening ? "Listening…" : placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          if (notice) setNotice(null)
        }}
        inputClassName="pr-[96px]"
        helper={notice ?? undefined}
        enterKeyHint="send"
        autoComplete="off"
      />
      {/* 27.5px label + gap, then centred in the 56px field */}
      <div className="absolute top-[35.5px] right-2 flex gap-1">
        <RoundButton
          type="button"
          variant="muted"
          aria-label={listening ? "Stop dictating" : "Dictate"}
          aria-pressed={listening}
          onClick={listening ? stopListening : startListening}
          className={cn(
            iconButton,
            listening && "animate-pulse bg-surface-danger text-text-inverse hover:bg-red-700"
          )}
        >
          <Icon name="mic" />
        </RoundButton>
        <RoundButton
          type="submit"
          variant="inverse"
          aria-label="Send"
          disabled={!canSend}
          className={cn(
            iconButton,
            "bg-surface-inverse",
            !canSend && "pointer-events-none bg-surface-muted text-gray-500"
          )}
        >
          <Icon name="back" className="rotate-90" />
        </RoundButton>
      </div>
    </form>
  )
}

export { ChatInput }
