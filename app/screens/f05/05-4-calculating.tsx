"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { Icon, RoundButton, ScreenTitle } from "@/components/pulse"
import { Badge } from "@/components/ui/badge"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const STEPS = [
  { title: "Activity and level", now: "Checking activity", done: "Football · medium risk" },
  { title: "Duration", now: "Checking duration", done: "1h 20, until 19:20" },
  { title: "Place", now: "Checking place", done: "Parque da Cidade, Porto" },
  { title: "Gear", now: "Checking ball and boots", done: "Ball and boots" },
  { title: "Price", now: "Calculating", done: "Shown on the next screen", next: "Shown on the next screen" },
]
const TICK = 1100

/** 05.4 Calculating · Figma 254:2732 — the timeline advances, then opens the quote (06.1). */
export default function Calculating() {
  const router = useRouter()
  const [done, setDone] = React.useState(1)

  React.useEffect(() => {
    if (done >= STEPS.length) {
      const t = setTimeout(() => router.push(href("06-1")), 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setDone((d) => d + 1), TICK)
    return () => clearTimeout(t)
  }, [done, router])

  const secondsLeft = Math.max(1, Math.ceil(((STEPS.length - done) * TICK) / 1000))

  return (
    <PhoneScreen title="Calculating" left={<span />} right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}>
      <ScreenTitle muted="your quote">Preparing</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">Football · 1h 20 · with gear</p>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 pt-[18px] pb-3.5">
        <div className="flex flex-col gap-2 pb-2.5">
          <div className="flex items-start justify-between text-[13px] leading-[1.3]">
            <p className="font-semibold" aria-live="polite">
              {Math.min(done, STEPS.length)} of {STEPS.length} done
            </p>
            <p className="font-medium text-text-secondary">{done >= STEPS.length ? "ready" : `about ${secondsLeft} s`}</p>
          </div>
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-[2px] bg-progress-track transition-colors duration-500",
                  i < done && "bg-progress-fill",
                  i === done && "animate-pulse bg-progress-fill/50"
                )}
              />
            ))}
          </div>
        </div>
        {STEPS.map((s, i) => {
          const state = i < done ? "done" : i === done ? "now" : "next"
          const last = i === STEPS.length - 1
          return (
            <div key={s.title} className="relative flex items-start gap-3 py-3">
              {!last && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-[41px] left-3 h-[27px] w-0.5 rounded-[1px] transition-colors duration-500",
                    i < done ? "bg-surface-inverse" : "bg-border-subtle"
                  )}
                />
              )}
              <span
                className={cn(
                  "flex size-[26px] shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  state === "done" && "bg-surface-inverse text-text-inverse",
                  state === "now" && "border-2 border-surface-inverse",
                  state === "next" && "bg-surface-muted text-[12px] font-semibold text-text-secondary"
                )}
              >
                {state === "done" && <Icon name="check" box={16} />}
                {state === "now" && <span className="size-2.5 animate-pulse rounded-full bg-surface-accent" />}
                {state === "next" && i + 1}
              </span>
              <div className="flex flex-1 flex-col gap-0.5 leading-[1.3]">
                <p
                  className={cn(
                    "text-[15px]",
                    state === "done" && "font-medium",
                    state === "now" && "font-semibold",
                    state === "next" && "text-text-secondary"
                  )}
                >
                  {s.title}
                </p>
                <p className="text-[12px] text-text-secondary">{state === "done" ? s.done : state === "now" ? s.now : (s.next ?? "Waiting")}</p>
              </div>
              <Badge
                variant={state === "now" ? "now" : "done"}
                className={cn("h-auto rounded-[12px] px-2.5 py-1 text-[12px] leading-[1.3]", state === "done" && "text-text-primary")}
              >
                {state === "done" ? "Done" : state === "now" ? "Now" : "Next"}
              </Badge>
            </div>
          )
        })}
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">Your age and fitness don&apos;t affect the price [V].</p>
    </PhoneScreen>
  )
}
