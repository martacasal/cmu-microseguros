"use client"

import * as React from "react"
import { Chip, LinkOrButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { EXTEND_OPTIONS, SessionTopBar, SmallTitle, TimerRing } from "./_parts"

/** 08.1 Active session · Figma 254:3027 — covered pill (periwinkle), coral timer ring, red SOS. */
export default function ActiveSession() {
  const [extend, setExtend] = React.useState<string>("+30 min")
  return (
    <PhoneScreen header={false} contentClassName="pt-0">
      <SessionTopBar />
      <div className="flex flex-col gap-3">
        <TimerRing size={260} stroke={20} progress={0.63} time="52:14" caption="left · ends at 19:20" timeSize={60} />
        <SmallTitle muted="capped at €X.XX">€X.XX so far</SmallTitle>
        <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary">EXTEND</p>
        <div className="flex flex-wrap gap-2">
          {EXTEND_OPTIONS.map((o) => (
            <Chip key={o.label} selected={extend === o.label} onClick={() => setExtend(o.label)}>
              {o.label}
            </Chip>
          ))}
        </div>
        <div className="flex gap-2">
          <LinkOrButton
            href={href("08-2")}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-brand text-[16px] font-semibold text-text-inverse transition-colors hover:bg-surface-brand/90"
          >
            Extend
          </LinkOrButton>
          <LinkOrButton
            href={href("08-3")}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-muted text-[16px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
          >
            End
          </LinkOrButton>
        </div>
        <p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">Press and hold to end</p>
      </div>
    </PhoneScreen>
  )
}
