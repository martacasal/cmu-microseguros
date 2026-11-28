import Link from "next/link"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 08.5 Watch · Figma 254:3129 — watch Live Activity + fall detection prompt, on the muted sand page. */
export default function Watch() {
  return (
    <PhoneScreen header={false} logo={false} className="bg-surface-muted" contentClassName="pt-3">
      <div aria-hidden className="h-[30px] shrink-0" />
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-brand p-[18px] text-text-inverse">
        <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-inverse-muted">PULSE · WATCH</p>
        <p className="text-[72px] leading-[1.04] font-bold tracking-[-0.03em] text-indigo-500 tabular-nums">52:14</p>
        <p className="text-[14px] leading-[1.32] font-medium text-text-inverse-muted">Covered until 19:20 · hold for SOS</p>
      </div>
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-warning p-[18px] leading-[1.32]">
        <p className="text-[11px] font-semibold tracking-[0.06em] text-text-secondary">FALL DETECTED? [H]</p>
        <p className="text-[20px] font-semibold">Are you OK?</p>
        <p className="text-[14px] font-medium text-text-secondary">We&apos;ll alert your contact in 30 s if you don&apos;t answer.</p>
      </div>
      <div className="flex gap-2">
        <Link
          href={href("08-1")}
          className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-card text-[16px] font-semibold transition-colors hover:bg-surface-subtle"
        >
          I&apos;m OK
        </Link>
        <Link
          href={href("11-1")}
          className="flex h-14 flex-1 items-center justify-center rounded-full bg-surface-inverse text-[16px] font-semibold text-text-inverse transition-colors hover:bg-surface-inverse-raised"
        >
          Get help
        </Link>
      </div>
    </PhoneScreen>
  )
}
