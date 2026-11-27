"use client"

import * as React from "react"
import { CtaButton, RoundButton, ScreenTitle, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { cn } from "cn"
import { href } from "../types"
import { HeaderTitle } from "./_parts"

const TYPES = ["Bike", "Surfboard", "GPS watch", "Wheelchair", "Other"] as const

/** 10.6 Add gear · Figma 254:3386 */
export default function AddGear() {
  const [type, setType] = React.useState<(typeof TYPES)[number]>("Bike")
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("10-5")} aria-label="Back" />}
      title={<HeaderTitle>New gear</HeaderTitle>}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <CtaButton href={href("10-5")} className="justify-center text-center">
          Save gear
        </CtaButton>
      }
    >
      <ScreenTitle size={32} muted="gear">
        New
      </ScreenTitle>
      <div className="flex flex-wrap gap-1.5">
        {TYPES.map((t) => {
          const selected = type === t
          return (
            <button
              key={t}
              type="button"
              aria-pressed={selected}
              onClick={() => setType(t)}
              className={cn(
                "flex h-[84px] w-[110px] flex-col justify-between rounded-[24px] px-3.5 py-3 text-left text-[14px] leading-[1.32] font-semibold transition-colors",
                selected ? "bg-surface-brand text-text-inverse" : "bg-surface-card text-text-primary hover:bg-surface-subtle"
              )}
            >
              <span className={cn("size-[22px] rounded-full", selected ? "bg-surface-card" : "bg-surface-muted")} />
              {t}
            </button>
          )
        })}
      </div>
      <TextField label="Name" placeholder="e.g. Road bike" />
      <TextField label="Declared value" placeholder="€" inputMode="decimal" />
      <button
        type="button"
        className="flex h-20 shrink-0 items-center justify-center rounded-[28px] bg-surface-muted transition-opacity hover:opacity-90"
      >
        <span className="rounded-2xl bg-surface-card px-3.5 py-2 text-[12px] leading-[1.32] font-medium text-text-secondary">
          + invoice and photos (optional)
        </span>
      </button>
    </PhoneScreen>
  )
}
