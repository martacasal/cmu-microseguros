"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "cn"
import { SportIcon, type SportName, ActivityTile, CtaButton, DurationBars, RiskBanner, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const ACTIVITIES = ["Running", "Football", "Cycling", "Surfing", "Hiking"] as const
const START = 18 * 60 // 18:00
const STEP = 15
const MAX = 240

const dur = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`
const clock = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`

/** 05.1 Turn on · Figma 254:2583 */
export default function TurnOn() {
  const [activity, setActivity] = React.useState<string>("Football")
  const [minutes, setMinutes] = React.useState(80)
  const [gear, setGear] = React.useState(true)

  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("04-2")} aria-label="Back" />}
      title="Turn on"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <CtaButton href={href("05-4")} price="€X.XX">
          See quote
        </CtaButton>
      }
    >
      <ScreenTitle size={32} muted="at Parque da Cidade">
        {activity}
      </ScreenTitle>
      <div className="grid grid-cols-3 gap-1.5">
        {ACTIVITIES.map((a) => (
          <ActivityTile
            key={a}
            sport={a.toLowerCase() as SportName}
            selected={activity === a}
            onClick={() => setActivity(a)}
            className="h-[84px] rounded-[24px] px-3.5 py-3 [&>span:first-child]:size-[22px]"
          >
            {a}
          </ActivityTile>
        ))}
        <Link
          href={href("05-2")}
          className="flex h-[84px] flex-col justify-between rounded-[24px] bg-surface-card px-3.5 py-3 text-[14px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
        >
          <SportIcon name="other" className="size-[22px]" />+ Other
        </Link>
      </div>
      <RiskBanner className="w-fit py-2 pr-3.5 pl-2 text-[13px] font-semibold [&>span:first-child]:size-[22px]">
        Medium risk · contact, knee and ankle
      </RiskBanner>
      <div className="flex flex-col gap-3.5 rounded-[28px] bg-surface-card px-5 py-[18px]">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-[44px] leading-[1.04] font-bold tracking-[-0.03em] tabular-nums">{dur(minutes)}</p>
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
        <DurationBars
          value={Math.floor(minutes / STEP)}
          max={MAX / STEP}
          className="w-full gap-[7.3px] [&>span]:h-7 [&>span]:rounded-[6px]"
        />
      </div>
      <div className="flex items-center gap-3 rounded-[28px] bg-surface-card px-5 py-3.5">
        <div className="flex flex-1 flex-col gap-0.5 leading-[1.32]">
          <p className="text-[15px] font-semibold">Cover my gear</p>
          <p className="text-[12px] font-medium text-text-secondary">+ €X.XX · ball and boots</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={gear}
          aria-label="Cover my gear"
          onClick={() => setGear((g) => !g)}
          className={cn(
            "relative h-8 w-[52px] shrink-0 rounded-full p-1 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40",
            gear ? "bg-surface-brand" : "bg-control-off"
          )}
        >
          <span
            className={cn(
              "block size-6 rounded-full bg-surface-card shadow-sm transition-transform",
              gear ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>
    </PhoneScreen>
  )
}
