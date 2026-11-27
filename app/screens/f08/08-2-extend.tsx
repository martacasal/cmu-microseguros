"use client"

import * as React from "react"
import { Chip, CtaButton, DataRow, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { BottomSheet, EXTEND_OPTIONS, SessionTopBar, SmallTitle, TimerRing } from "./_parts"

/** 08.2 Extend · Figma 254:3054 — bottom sheet over the active session. */
export default function Extend() {
  const [minutes, setMinutes] = React.useState<number>(30)
  const end = 19 * 60 + 20 + minutes
  const endLabel = `${Math.floor(end / 60)}:${String(end % 60).padStart(2, "0")}`
  return (
    <PhoneScreen header={false} contentClassName="pt-0">
      <SessionTopBar />
      <TimerRing size={200} stroke={16} progress={0.63} time="52:14" caption="left" timeSize={44} />
      <BottomSheet>
        <SmallTitle muted="your session">Extend</SmallTitle>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">No gap in cover. Same price per minute.</p>
        <div className="flex w-full flex-wrap gap-2">
          {EXTEND_OPTIONS.map((o) => (
            <Chip key={o.label} selected={minutes === o.minutes} onClick={() => setMinutes(o.minutes)}>
              {o.label}
            </Chip>
          ))}
        </div>
        <div className="flex w-full flex-col rounded-[28px] bg-surface-card px-5 py-1.5">
          <DataRow label="New end time" value={endLabel} />
          <DataRow label="Extra cost" value="+ €X.XX" />
        </div>
        <CtaButton href={href("08-1")} price="+ €X.XX">
          Confirm
        </CtaButton>
        <TextButton href={href("08-1")}>Cancel</TextButton>
      </BottomSheet>
    </PhoneScreen>
  )
}
