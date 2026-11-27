"use client"

import * as React from "react"
import { CheckRow, CtaButton, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const ITEMS = [
  { label: "I have read and accept the Terms and Conditions *", required: true, checked: true },
  { label: "I received the pre-contract information *", required: true, checked: true },
  { label: "Location only while I'm covered *", required: true, checked: false },
  { label: "Tips and news (optional)", required: false, checked: false },
]

/** 02.4 Consents · Figma 254:2341 — CTA unlocks once every required item is ticked. */
export default function Consents() {
  const [checked, setChecked] = React.useState(ITEMS.map((i) => i.checked))
  const ready = ITEMS.every((item, i) => !item.required || checked[i])

  return (
    <PhoneScreen
      title="3 of 3"
      left={<RoundButton icon="back" href={href("02-3")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-2.5"
      footer={
        <CtaButton href={href("03-1")} disabled={!ready} className="text-center">
          Accept and go to payment
        </CtaButton>
      }
    >
      <ScreenTitle muted="a few things">Confirm</ScreenTitle>
      {ITEMS.map((item, i) => (
        <CheckRow
          key={item.label}
          label={item.label}
          checked={checked[i]}
          onCheckedChange={(v) => setChecked((c) => c.map((x, j) => (j === i ? v : x)))}
        />
      ))}
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        * required. The button unlocks once required items are ticked. Optional is never pre-ticked.
      </p>
    </PhoneScreen>
  )
}
