"use client"

import { CtaButton, DataRow, RoundButton, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { ChipChoice, TwoTone } from "../f11/_parts"

const label = "text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase"

/** 13.5 Schedule a call · Figma 254:3916 */
export default function ScheduleACall() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("13-3")} aria-label="Back" />}
      title="Call"
      contentClassName="gap-3"
      footer={
        <CtaButton href={href("13-6")} className="text-center">
          Confirm call
        </CtaButton>
      }
    >
      <TwoTone muted="we call you?">When should</TwoTone>
      <p className={label}>Day</p>
      <ChipChoice options={["Today", "Tomorrow", "Fri 14"]} defaultValue="Today" />
      <p className={label}>Time</p>
      <ChipChoice options={["10:00", "11:30", "15:00", "17:30"]} defaultValue="15:00" />
      <TextField label="Mobile" placeholder="+351 9XX XXX XXX" type="tel" inputMode="tel" autoComplete="tel" />
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 py-1.5">
        <DataRow label="Topic" value="Cover" />
      </div>
    </PhoneScreen>
  )
}
