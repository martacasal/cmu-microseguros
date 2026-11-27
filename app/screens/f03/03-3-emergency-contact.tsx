"use client"

import * as React from "react"
import { CheckRow, Chip, CtaButton, RoundButton, ScreenTitle, TextButton, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const RELATIONS = ["Family", "Friend", "Partner", "Other"]

/** 03.3 Emergency contact · Figma 254:2393 */
export default function EmergencyContact() {
  const [relation, setRelation] = React.useState("Family")
  return (
    <PhoneScreen
      title="Emergency"
      left={<RoundButton icon="back" href={href("03-2")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <>
          <CtaButton href={href("03-4")} className="text-center">
            Save
          </CtaButton>
          <TextButton href={href("03-4")}>Add later</TextButton>
        </>
      }
    >
      <ScreenTitle muted="contact">Emergency</ScreenTitle>
      <TextField label="Name" autoComplete="off" placeholder="e.g. Marta Silva" />
      <TextField label="Mobile" type="tel" placeholder="+351 9XX XXX XXX" />
      <div className="flex flex-wrap gap-2">
        {RELATIONS.map((r) => (
          <Chip key={r} selected={relation === r} onClick={() => setRelation(r)}>
            {r}
          </Chip>
        ))}
      </div>
      <CheckRow label="Only notify when I ask for help" defaultChecked />
    </PhoneScreen>
  )
}
