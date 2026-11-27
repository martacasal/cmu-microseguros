import * as React from "react"
import { cn } from "cn"
import { RoundButton } from "@/components/pulse"
import { href } from "../types"

/** "estado · protegido" pill: periwinkle surface + covered dot. */
export function CoveredPill({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-[20px] bg-surface-info px-3.5 py-[9px] text-[14px] leading-[1.32] font-semibold text-text-primary", className)}>
      <span className="size-2.5 rounded-full bg-status-covered" />
      Covered
    </span>
  )
}

/** Top row of an active session: covered pill (Figma y=56) + SOS (y=46, 56px). Sits right under the status bar. */
export function SessionTopBar() {
  return (
    <div className="-mt-1.5 flex h-14 shrink-0 items-center justify-between">
      <CoveredPill />
      <RoundButton variant="sos" href={href("11-1")} aria-label="SOS">
        SOS
      </RoundButton>
    </div>
  )
}

/** "anel de tempo": track ring + indigo progress arc from 12 o'clock clockwise, time centred. */
export function TimerRing({
  size,
  stroke,
  progress,
  time,
  caption,
  timeSize,
}: {
  size: number
  stroke: number
  progress: number
  time: string
  caption: string
  timeSize: number
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-progress-track" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={`${c * progress} ${c}`}
          className="stroke-progress-fill"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
        <p className="leading-[1.04] font-bold tracking-[-0.03em] tabular-nums" style={{ fontSize: timeSize }}>
          {time}
        </p>
        <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">{caption}</p>
      </div>
    </div>
  )
}

/** Dimmed background + bottom sheet (radius 32 top, handle, 24px gutter, 34px bottom). */
export function BottomSheet({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-navy-950/50" />
      <div
        role="dialog"
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 rounded-t-[32px] bg-surface-page px-6 pt-3 pb-[34px] md:inset-x-auto md:bottom-8 md:left-1/2 md:w-[calc(100%-4rem)] md:max-w-[560px] md:-translate-x-1/2 md:rounded-[32px] md:px-8 md:pb-8 md:shadow-xl"
      >
        <span aria-hidden className="h-[5px] w-10 rounded-[3px] bg-border-subtle" />
        {children}
      </div>
    </>
  )
}

/** 28px two-tone title used in the sheets and the "so far" block. */
export function SmallTitle({ children, muted }: { children: React.ReactNode; muted: React.ReactNode }) {
  return (
    <h2 className="w-full text-[28px] leading-[1.04] font-bold tracking-[-0.03em]">
      <span className="block text-text-primary">{children}</span>
      <span className="block text-text-secondary">{muted}</span>
    </h2>
  )
}

export const EXTEND_OPTIONS = [
  { label: "+15 min", minutes: 15 },
  { label: "+30 min", minutes: 30 },
  { label: "+1 h", minutes: 60 },
] as const
