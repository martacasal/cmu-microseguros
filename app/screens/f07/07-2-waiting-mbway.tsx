"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { InfoCard, RoundButton, ScreenTitle, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
/** prototype: the MB WAY request is "approved" after a few seconds */
const APPROVE_AFTER = 5

/** 07.2 Waiting for MB WAY · Figma 254:2986 — auto-advances to 07.3 when "approved". */
export default function WaitingMbWay() {
  const router = useRouter()
  const [left, setLeft] = React.useState(3 * 60 + 45)

  React.useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    const done = setTimeout(() => router.push(href("07-3")), APPROVE_AFTER * 1000)
    return () => {
      clearInterval(t)
      clearTimeout(done)
    }
  }, [router])

  return (
    <PhoneScreen
      title="Payment"
      left={<span />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={<TextButton href={href("07-1")} className="text-text-danger hover:bg-surface-danger-subtle/60">Cancel request</TextButton>}
    >
      <div className="flex h-[170px] items-center justify-center rounded-[28px] bg-surface-muted">
        <span className="rounded-2xl bg-surface-card px-3.5 py-2 text-[12px] leading-[1.32] font-medium text-text-secondary">
          confirm in the MB WAY app
        </span>
      </div>
      <ScreenTitle muted="in the MB WAY app">Confirm</ScreenTitle>
      <InfoCard variant="brand" overline="Request expires in">
        <span className="text-[56px] leading-[1.04] font-bold tracking-[-0.03em] text-indigo-500 tabular-nums" aria-live="off">
          {fmt(left)}
        </span>
        <span className="text-[14px] leading-[1.32] font-medium text-text-inverse-muted">We sent a €X.XX request.</span>
      </InfoCard>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">Cover only starts once the payment is approved.</p>
    </PhoneScreen>
  )
}
