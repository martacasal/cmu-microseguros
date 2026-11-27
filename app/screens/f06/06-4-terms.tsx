"use client"

import * as React from "react"
import { MaskIcon, RoundButton, ScreenTitle, Seal, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const ITEMS = [
  { icon: "shieldq", q: "Why am I not covered today?", a: "The law only requires it for federations, gyms and events." },
  { icon: "building", q: "Who backs this insurance?" },
  { icon: "clock", q: "How does per-minute cover work?" },
  { icon: "aid", q: "What do I do if I get hurt?" },
  { icon: "undo", q: "Can I cancel? Refunds? [V]" },
]

/** 06.4 Terms · Figma 254:2912 */
export default function Terms() {
  const [open, setOpen] = React.useState(0)
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("06-2")} aria-label="Back" />}
      title="Terms"
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={<SecondaryButton>Open full document (PDF)</SecondaryButton>}
    >
      <ScreenTitle muted="in plain English">Terms,</ScreenTitle>
      <Seal />
      <div className="flex flex-col rounded-[28px] bg-surface-card px-4 py-1.5">
        {ITEMS.map((it, i) => {
          const expanded = open === i && it.a
          return (
            <button
              key={it.q}
              type="button"
              aria-expanded={!!expanded}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex items-center gap-3 border-b border-border-subtle py-3 text-left last:border-b-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-primary">
                <MaskIcon src={`/icons/f06/${it.icon}.svg`} width={20} height={20} box={20} />
              </span>
              <span className="flex flex-1 flex-col gap-0.5 leading-[1.32]">
                <span className="text-[15px] font-semibold text-text-primary">{it.q}</span>
                {expanded && <span className="text-[13px] text-text-secondary">{it.a}</span>}
              </span>
              <span className="text-[18px] leading-[1.32] font-medium text-text-secondary">+</span>
            </button>
          )
        })}
      </div>
    </PhoneScreen>
  )
}
