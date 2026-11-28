"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { ChatBubble, ChatInput, Chip } from "@/components/pulse"
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

/**
 * Keeps a chat scrolled to its newest message, like a messaging app: a new message always scrolls
 * the page to the bottom, so it sits just above the pinned input. A reply that grows as it streams
 * keeps it there, unless the person has scrolled up to read something.
 * `count` is the number of messages; `content` changes whenever a message's text changes.
 */
export function useStickToBottom(count: number, content?: unknown) {
  const stuck = React.useRef(true)
  const lastCount = React.useRef(count)

  React.useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const fromBottom = document.documentElement.scrollHeight - (y + window.innerHeight)
      if (fromBottom < 80) stuck.current = true
      else if (y < lastY - 2) stuck.current = false // only the person scrolling up unsticks it
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const added = count > lastCount.current
    lastCount.current = count
    if (!added && !stuck.current) return
    if (added) stuck.current = true
    else if (content === undefined) return
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: added ? "smooth" : "auto" })
  }, [count, content])
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
  onSend,
  composerDisabled,
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
  /** When set, the page owns the thread: sent text goes here instead of a local "You" bubble. */
  onSend?: (text: string) => void
  composerDisabled?: boolean
}) {
  const router = useRouter()
  const [sent, setSent] = React.useState<string[]>([])
  useStickToBottom(sent.length)
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
          <ChatInput
            label={composerLabel}
            placeholder={placeholder}
            disabled={composerDisabled}
            onSend={(t) => {
              if (onSend) return onSend(t)
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
    </PhoneScreen>
  )
}

export const ASSISTANT = "Automated assistant · not a person"
