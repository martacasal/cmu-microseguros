import * as React from "react"
import { cn } from "cn"

/** B2/Seal · regulatory line with insurer mark ("Insurance issued by ..., supervised by ASF"). */
function Seal({
  mark = "ASF",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { mark?: React.ReactNode }) {
  return (
    <div data-slot="seal" className={cn("flex items-center gap-3", className)} {...props}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-brand text-[9px] font-bold text-text-inverse">
        {mark}
      </span>
      <p className="type-caption text-text-secondary">{children}</p>
    </div>
  )
}

export { Seal }
