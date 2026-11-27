import { RoundButton, ScreenTitle, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { CoverItem } from "./_parts"

/** 06.2 What's covered and not · Figma 254:2844 */
export default function WhatsCovered() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("06-1")} aria-label="Back" />}
      title="What's covered"
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-2.5"
      footer={<TextButton href={href("06-4")}>Read full terms (PDF)</TextButton>}
    >
      <ScreenTitle size={32} muted="this session">
        Covered
      </ScreenTitle>
      <div className="flex gap-2">
        <CoverItem covered title="Treatment" className="h-[120px] flex-1">
          appointments, tests, up to [AMOUNT]
        </CoverItem>
        <CoverItem covered title="Disability" className="h-[120px] flex-1">
          lump sum if there are lasting effects
        </CoverItem>
      </div>
      <CoverItem covered title="Gear (you chose it)">
        Damage or theft during the activity, up to [AMOUNT].
      </CoverItem>
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">Not covered</p>
      <div className="flex gap-2">
        <CoverItem covered={false} title="Outside your slot" className="h-[120px] flex-1">
          before 18:00 or after 19:20
        </CoverItem>
        <CoverItem covered={false} title="Federation" className="h-[120px] flex-1">
          federation events and training
        </CoverItem>
      </div>
      <span className="w-fit rounded-2xl bg-surface-muted px-3 py-[7px] text-[12px] leading-[1.32] font-semibold">
        [V] Third-party liability to be confirmed
      </span>
    </PhoneScreen>
  )
}
