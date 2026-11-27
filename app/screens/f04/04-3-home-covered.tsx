"use client"

import * as React from "react"
import Link from "next/link"
import { BottomNav, InfoCard, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

/** 04.3 Home · covered · Figma 254:2559 */
export default function HomeCovered() {
  const [left, setLeft] = React.useState(52 * 60 + 14)
  React.useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <PhoneScreen
      left={<RoundButton icon="user" href={href("10-4")} aria-label="Profile" />}
      right={
        <RoundButton variant="sos" href={href("11-1")} aria-label="SOS">
          SOS
        </RoundButton>
      }
      nav={<BottomNav tab="home" covered actionHref={href("08-1")} />}
    >
      <p className="flex items-center gap-2 text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">
        <span className="size-2 rounded-full bg-status-covered" aria-hidden />
        Football · Parque da Cidade
      </p>
      <ScreenTitle muted="covered">You&apos;re</ScreenTitle>
      <InfoCard variant="brand" overline={<LiveOverline>Time left</LiveOverline>}>
        <span className="text-[64px] leading-[1.04] font-bold tracking-[-0.03em] text-text-inverse tabular-nums">{fmt(left)}</span>
        <span className="text-[14px] leading-[1.32] font-medium text-text-inverse-muted">Until 19:20 · €X.XX so far</span>
      </InfoCard>
      <div className="flex gap-2">
        <Link
          href={href("08-2")}
          className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-accent text-[16px] font-semibold text-text-on-accent transition-colors hover:bg-indigo-600"
        >
          Extend
        </Link>
        <Link
          href={href("08-1")}
          className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-muted text-[16px] font-semibold text-text-primary transition-opacity hover:opacity-90"
        >
          View session
        </Link>
      </div>
      <InfoCard title="What's covered now" titleSize={17} description="Treatment and gear. Tap to see." href={href("06-2")} />
    </PhoneScreen>
  )
}

function LiveOverline({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-surface-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-surface-accent" />
      </span>
      {children}
    </span>
  )
}
