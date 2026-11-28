"use client"

import * as React from "react"
import { cn } from "cn"
import { type SportName, ActivityTile, CtaButton, InfoCard, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const ACTIVITIES = ["Running", "Football", "Cycling", "Surfing", "Hiking", "+ Other"]
const STEP = 15
const MAX = 240
const START = 18 * 60

const pad = (n: number) => String(n).padStart(2, "0")
const duration = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${pad(m)}`
}
const clock = (min: number) => `${pad(Math.floor(min / 60) % 24)}:${pad(min % 60)}`

/** 01.2 Price simulator · Figma 254:2175 */
export default function PriceSimulator() {
  const [activity, setActivity] = React.useState("Football")
  const [minutes, setMinutes] = React.useState(80)
  const filled = Math.round(minutes / STEP)

  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("01-1")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <CtaButton href={href("02-1")} className="text-center">
          Continue
        </CtaButton>
      }
    >
      <ScreenTitle muted="your workout cost?">How much does</ScreenTitle>

      <div className="grid grid-cols-3 gap-1.5">
        {ACTIVITIES.map((a) => (
          <ActivityTile
            key={a}
            sport={(a.startsWith("+") ? "other" : a.toLowerCase()) as SportName}
            selected={activity === a}
            onClick={() => setActivity(a)}
            className="h-[84px] rounded-[24px] px-3.5 py-3"
          >
            {a}
          </ActivityTile>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 rounded-[28px] bg-surface-card px-5 py-[18px]">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-[44px] leading-[1.04] font-bold tracking-[-0.03em]">{duration(minutes)}</p>
            <p className="text-[13px] leading-[1.32] font-medium text-text-secondary">
              until {clock(START + minutes)} · max. 4 h [V]
            </p>
          </div>
          <RoundButton
            variant="minus"
            className="size-11 text-[20px] font-semibold"
            aria-label="Less time"
            disabled={minutes <= STEP}
            onClick={() => setMinutes((m) => Math.max(STEP, m - STEP))}
          >
            −
          </RoundButton>
          <RoundButton
            variant="plus"
            className="size-11 text-[20px] font-semibold"
            aria-label="More time"
            disabled={minutes >= MAX}
            onClick={() => setMinutes((m) => Math.min(MAX, m + STEP))}
          >
            +
          </RoundButton>
        </div>
        <div className="flex h-7 justify-between" aria-hidden>
          {Array.from({ length: MAX / STEP }, (_, i) => (
            <span
              key={i}
              className={cn("h-7 w-3 rounded-[6px]", i < filled ? "bg-progress-fill" : "bg-surface-muted")}
            />
          ))}
        </div>
      </div>

      <InfoCard
        variant="brand"
        overline="Estimate"
        title={<span className="text-[40px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</span>}
        description="Never more than €X.XX this session."
      />
    </PhoneScreen>
  )
}
