"use client"

import * as React from "react"
import { CheckRow, CtaButton, DataRow, RoundButton, ScreenTitle, Seal, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const METHODS = ["MB WAY", "Card", "Apple Pay / Google Pay [V]"] as const

/** 07.1 Pay · Figma 254:2967 */
export default function Pay() {
  const [method, setMethod] = React.useState<(typeof METHODS)[number]>("MB WAY")
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("06-1")} aria-label="Back" />}
      title="Payment"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-2.5"
      footer={
        <>
          <Seal />
          <CtaButton href={href("07-2")} price="€X.XX">
            Pay and turn on
          </CtaButton>
        </>
      }
    >
      <ScreenTitle muted="want to pay?">How do you</ScreenTitle>
      <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-2.5">
        {METHODS.map((m) => (
          <CheckRow key={m} label={m} checked={method === m} onCheckedChange={() => setMethod(m)} />
        ))}
      </div>
      {method === "MB WAY" && (
        <TextField label="MB WAY mobile" type="tel" inputMode="tel" placeholder="+351 9XX XXX XXX" />
      )}
      <div className="rounded-[28px] bg-surface-card px-5 py-1.5">
        <DataRow label="Session total" value="€X.XX" />
      </div>
    </PhoneScreen>
  )
}
