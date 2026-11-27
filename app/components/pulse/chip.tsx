import * as React from "react"
import { cn } from "cn"

/** v2/Chip · 14 medium pill; selected = navy brand. */
function Chip({
  className,
  selected,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      data-slot="chip"
      aria-pressed={selected}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-surface-card px-[18px] py-[11px] text-[14px] leading-none font-medium text-text-primary outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/40 disabled:bg-surface-subtle disabled:text-gray-500",
        "aria-pressed:bg-surface-brand aria-pressed:text-text-inverse aria-pressed:hover:bg-surface-brand/90",
        className
      )}
      {...props}
    />
  )
}

/** Activity tile · selectable card on Turn on / Price simulator (Running, Football...). */
function ActivityTile({
  className,
  selected,
  children,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "flex h-20 flex-col justify-between rounded-[22px] bg-surface-card p-3.5 text-left text-[14px] font-semibold text-text-primary outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/40",
        "aria-pressed:bg-surface-brand aria-pressed:text-text-inverse aria-pressed:hover:bg-surface-brand/90",
        className
      )}
      {...props}
    >
      <span className={cn("size-6 rounded-full bg-surface-muted", selected && "bg-surface-card")} />
      {children}
    </button>
  )
}

export { Chip, ActivityTile }
