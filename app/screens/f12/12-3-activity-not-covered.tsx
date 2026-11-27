"use client"

import * as React from "react"
import { Chip } from "@/components/pulse"
import { href } from "../types"
import { ExceptionScreen } from "./_parts"

const SUGGESTIONS = ["Surfing", "Bodyboarding", "Stand up paddle"]

/** 12.3 Activity not covered · Figma 254:3642 */
export default function ActivityNotCovered() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <ExceptionScreen
      back={href("05-2")}
      icon="ban"
      tone="danger"
      title="Kitesurfing isn't"
      muted="covered yet"
      body="Some higher-risk activities are still under review."
      primary={{ label: "Let me know when it's covered", href: href("05-2") }}
      secondary={{ label: "Choose another activity", href: href("05-2") }}
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.66px] text-text-secondary">HOW ABOUT ONE OF THESE?</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <Chip key={s} selected={picked === s} onClick={() => setPicked(picked === s ? null : s)}>
            {s}
          </Chip>
        ))}
      </div>
    </ExceptionScreen>
  )
}
