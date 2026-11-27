import * as React from "react"
import { cn } from "cn"

/** Activity bars (01.1 Welcome, 01.2 simulator): heights in px; `active` marks the highlighted bars. */
function BarChart({
  bars,
  active = [],
  height = 120,
  tone = "default",
  className,
}: {
  bars: number[]
  active?: number[]
  height?: number
  tone?: "default" | "inverse"
  className?: string
}) {
  return (
    <div className={cn("flex w-full items-end gap-2", className)} style={{ height }} aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-full",
            active.includes(i)
              ? "bg-surface-accent"
              : tone === "inverse"
                ? "bg-surface-inverse-raised"
                : "bg-surface-muted"
          )}
          style={{ height: h }}
        />
      ))}
    </div>
  )
}

export { BarChart }
