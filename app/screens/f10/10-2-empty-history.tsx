import { BottomNav, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 10.2 Empty history · Figma 254:3255 — illustration placeholder kept as in the wireframe. */
export default function EmptyHistory() {
  return (
    <PhoneScreen
      left={<RoundButton icon="user" href={href("10-4")} aria-label="Profile" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      nav={<BottomNav tab="history" />}
    >
      <ScreenTitle muted="sessions yet">Not covered</ScreenTitle>
      <div className="flex h-[220px] shrink-0 items-center justify-center rounded-[28px] bg-surface-muted">
        <span className="rounded-2xl bg-surface-card px-3.5 py-2 text-[12px] leading-[1.32] font-medium text-text-secondary">
          illustration · empty history
        </span>
      </div>
      <p className="text-[15px] leading-[1.32] text-text-secondary">
        Once you turn on cover, your sessions and invoices show up here.
      </p>
    </PhoneScreen>
  )
}
