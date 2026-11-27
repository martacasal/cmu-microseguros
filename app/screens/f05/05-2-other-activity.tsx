"use client"

import * as React from "react"
import Link from "next/link"
import { MaskIcon, RoundButton, ScreenTitle, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const SPORTS = [
  { name: "Basketball", risk: "Medium risk", icon: "basket", to: "05-3" },
  { name: "Beach volleyball", risk: "Low risk", icon: "volley", to: "05-3" },
  { name: "Surfing", risk: "High risk", icon: "wave", to: "05-3" },
  { name: "Climbing", risk: "High risk", icon: "mountain", to: "05-3" },
  { name: "Kitesurfing", risk: "Not covered yet", icon: "wind", to: "12-3", notCovered: true },
]

/** 05.2 Other activity · Figma 254:2657 */
export default function OtherActivity() {
  const [q, setQ] = React.useState("")
  const list = SPORTS.filter((s) => s.name.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("05-1")} aria-label="Back" />}
      title="Other activity"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
    >
      <ScreenTitle muted="are you doing?">Which sport</ScreenTitle>
      <TextField label="Search" placeholder="e.g. basketball, climbing" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length > 0 && (
        <div className="flex flex-col rounded-[28px] bg-surface-card px-4 py-1.5">
          {list.map((s) => (
            <Link
              key={s.name}
              href={href(s.to)}
              className="flex items-center gap-3 border-b border-border-subtle py-3 last:border-b-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-primary">
                <MaskIcon src={`/icons/f05/${s.icon}.svg`} width={20} height={20} box={20} />
              </span>
              <span className="flex flex-1 flex-col gap-0.5 leading-[1.32]">
                <span className="text-[15px] font-semibold text-text-primary">{s.name}</span>
                <span className="text-[13px] text-text-secondary">{s.risk}</span>
              </span>
              {s.notCovered ? (
                <span className="text-[18px] leading-[1.32] font-medium text-text-secondary">×</span>
              ) : (
                <MaskIcon src="/icons/f05/chevron.svg" width={18} height={18} box={18} className="text-text-primary" />
              )}
            </Link>
          ))}
        </div>
      )}
    </PhoneScreen>
  )
}
