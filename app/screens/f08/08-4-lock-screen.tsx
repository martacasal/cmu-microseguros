import Link from "next/link"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 08.4 Lock screen · Figma 254:3105 — iOS lock screen with PULSE notifications and Live Activity. */
export default function LockScreen() {
  const overline = "text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-inverse-muted"
  return (
    <PhoneScreen tone="inverse" header={false} contentClassName="pt-3 gap-2.5">
      <p className="text-center text-[80px] leading-[1.04] font-bold tracking-[-0.03em] tabular-nums">18:42</p>
      <p className="text-center text-[12px] leading-[1.32] font-medium text-text-inverse-muted">Saturday, 8 November</p>
      <div aria-hidden className="h-1.5 shrink-0" />

      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-inverse-raised p-[18px]">
        <p className={overline}>PULSE · AT YOUR SPOT</p>
        <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-brand p-[18px] leading-[1.32]">
          <p className="text-[18px] font-semibold">Football, as usual?</p>
          <p className="text-[14px] font-medium text-text-inverse-muted">1h 20 · up to €X.XX</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={href("04-2")}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-brand text-[16px] font-semibold transition-opacity hover:opacity-90"
          >
            Open
          </Link>
          <Link
            href={href("06-1")}
            className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-card text-[16px] font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
          >
            Turn on
          </Link>
        </div>
      </div>

      <Link href={href("08-1")} className="flex flex-col gap-1.5 rounded-[28px] bg-surface-brand p-[18px] transition-opacity hover:opacity-90">
        <p className={overline}>PULSE · LIVE ACTIVITY</p>
        <p className="text-[40px] leading-[1.04] font-bold tracking-[-0.03em] text-indigo-500 tabular-nums">52:14</p>
        <p className="flex items-center gap-1.5 text-[14px] leading-[1.32] font-medium text-text-inverse-muted">
          <span className="size-2 rounded-full bg-periwinkle-200" />
          Covered · €X.XX so far · SOS in 1 tap
        </p>
      </Link>

      <Link href={href("08-2")} className="flex flex-col gap-1.5 rounded-[28px] bg-surface-inverse-raised p-[18px] leading-[1.32] transition-opacity hover:opacity-90">
        <p className={overline}>PULSE · IN 15 MIN</p>
        <p className="text-[14px] font-medium">Your cover ends at 19:20. Want to extend?</p>
      </Link>
    </PhoneScreen>
  )
}
