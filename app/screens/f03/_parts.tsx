import * as React from "react"

/** Image placeholder card from 03.1 / 03.2: 220px sand card with a centred white label pill. */
export function ImagePlaceholder({ label }: { label: React.ReactNode }) {
  return (
    <div className="flex h-[220px] w-full shrink-0 items-center justify-center rounded-[28px] bg-surface-muted">
      <span className="rounded-2xl bg-surface-card px-3.5 py-2 text-[12px] leading-[1.32] font-medium whitespace-nowrap text-text-secondary">
        {label}
      </span>
    </div>
  )
}
