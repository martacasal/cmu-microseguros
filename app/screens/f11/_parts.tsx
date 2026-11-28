"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { ChatBubble, Chip, Icon, RoundButton, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"

/** Shared by flows 11 and 13 (chat screens, chips, tags). */

/** "etiqueta" · small 12 semibold pill (inverse = black in wireframe, muted = light grey). */
export function Tag({
  variant = "inverse",
  className,
  children,
}: {
  variant?: "inverse" | "muted" | "warning"
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center self-start rounded-2xl px-3 py-[7px] text-[12px] leading-[1.32] font-semibold whitespace-nowrap",
        variant === "inverse" && "bg-surface-inverse text-text-inverse",
        variant === "muted" && "bg-surface-muted text-text-primary",
        variant === "warning" && "bg-surface-warning text-text-primary",
        className
      )}
    >
      {children}
    </span>
  )
}

/** v2/Chip that navigates to another screen. */
export function ChipLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter()
  return <Chip onClick={() => router.push(href)}>{children}</Chip>
}

/** Row of chips with single local selection (Yes/No, day/time, feedback). */
export function ChipChoice({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o} selected={value === o} onClick={() => setValue(o)}>
          {o}
        </Chip>
      ))}
    </div>
  )
}

/** Chip row wrapper (flex-wrap, 8px gap). */
export function Chips({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

/** Big two-tone title used inside flows 11/13 (32–36px bold). */
export function TwoTone({
  size = 36,
  children,
  muted,
  inline = false,
}: {
  size?: number
  children: React.ReactNode
  muted: React.ReactNode
  /** Keep both parts on one line when they fit; wrap only when they don't. */
  inline?: boolean
}) {
  return (
    <h1 className="leading-[1.04] font-bold tracking-[-0.03em]" style={{ fontSize: size }}>
      <span className={cn(!inline && "block", "text-text-primary")}>{children}</span>
      {inline && " "}
      <span className={cn(!inline && "block", "text-text-secondary")}>{muted}</span>
    </h1>
  )
}

/** v2/Input "Message" with a send button; sending appends a "you" bubble via onSend. */
export function ChatComposer({
  label = "Message",
  placeholder,
  onSend,
}: {
  label?: string
  placeholder: string
  onSend: (text: string) => void
}) {
  const [text, setText] = React.useState("")
  const send = () => {
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText("")
  }
  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
    >
      <TextField
        label={label}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputClassName={text ? "pr-16" : undefined}
      />
      {text && (
        <RoundButton
          type="submit"
          variant="inverse"
          aria-label="Send"
          className="absolute right-2 bottom-1.5 size-11 bg-surface-inverse"
        >
          <Icon name="back" className="rotate-90" />
        </RoundButton>
      )}
    </form>
  )
}

/**
 * Chat screen: PhoneScreen + static thread + bubbles the user sends locally + composer footer.
 * `nextHref` moves the prototype on after the first message (e.g. 11.5 → 11.6).
 */
export function ChatScreen({
  left,
  right,
  title,
  gap = "gap-3.5",
  children,
  above,
  composerLabel,
  placeholder,
  nextHref,
}: {
  left?: React.ReactNode
  right?: React.ReactNode
  title: React.ReactNode
  gap?: string
  children: React.ReactNode
  /** footer content above the composer (e.g. a TextButton) */
  above?: React.ReactNode
  composerLabel?: string
  placeholder: string
  nextHref?: string
}) {
  const router = useRouter()
  const [sent, setSent] = React.useState<string[]>([])
  const endRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (sent.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [sent.length])
  return (
    <PhoneScreen
      pinFooter
      left={left}
      right={right}
      title={title}
      contentClassName={gap}
      footer={
        <>
          {above}
          <ChatComposer
            label={composerLabel}
            placeholder={placeholder}
            onSend={(t) => {
              setSent((s) => [...s, t])
              if (nextHref) setTimeout(() => router.push(nextHref), 900)
            }}
          />
        </>
      }
    >
      {children}
      {sent.map((t, i) => (
        <ChatBubble key={i} from="you" who="You">
          {t}
        </ChatBubble>
      ))}
      <div ref={endRef} />
    </PhoneScreen>
  )
}

export const ASSISTANT = "Automated assistant · not a person"
