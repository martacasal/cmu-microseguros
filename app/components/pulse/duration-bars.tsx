import * as React from "react"
import { cn } from "cn"

/** Duration meter · segmented bars (filled = chosen 15-min blocks). */
function DurationBars({
  value,
  max = 16,
  className,
  ...props
}: React.ComponentProps<"div"> & { value: number; max?: number }) {
  return (
    <div
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("flex gap-1.5", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn("h-6 flex-1 rounded-full", i < value ? "bg-surface-brand" : "bg-surface-muted")}
        />
      ))}
    </div>
  )
}

export { DurationBars }
