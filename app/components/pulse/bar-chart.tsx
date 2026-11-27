import * as React from "react"
import { cn } from "cn"

/** Activity bars (01.1 Welcome, 01.2 simulator): heights in px; `active` marks the highlighted bars. `scroll` runs them along the page as a loop. */
function BarChart({
  bars,
  active = [],
  height = 120,
  tone = "default",
  scroll = false,
  className,
}: {
  bars: number[]
  active?: number[]
  height?: number
  tone?: "default" | "inverse" | "accent"
  scroll?: boolean
  className?: string
}) {
  const renderBars = (copy: number) =>
    bars.map((h, i) => (
      <span
        key={`${copy}-${i}`}
        className={cn(
          "rounded-full",
          scroll
            ? "w-4 shrink-0 origin-bottom will-change-transform"
            : "flex-1",
          scroll &&
            (active.includes(i) ? "animate-bar-live" : "animate-bar-breathe"),
          active.includes(i)
            ? tone === "accent"
              ? "bg-surface-warning"
              : "bg-surface-accent"
            : tone === "accent"
              ? "bg-white/20"
              : tone === "inverse"
                ? "bg-surface-inverse-raised"
                : "bg-surface-muted"
        )}
        style={{
          height: h,
          ...(scroll
            ? { animationDelay: `${-((i * 0.37) % 3).toFixed(2)}s` }
            : null),
        }}
      />
    ))

  if (scroll) {
    return (
      <div
        className={cn("w-full overflow-hidden", className)}
        style={{ height }}
        aria-hidden
      >
        <div className="flex h-full w-max animate-bars-scroll items-end gap-2 pr-2">
          {renderBars(0)}
          {renderBars(1)}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("flex w-full items-end gap-2", className)}
      style={{ height }}
      aria-hidden
    >
      {renderBars(0)}
    </div>
  )
}

export { BarChart }
