import * as React from "react"
import { cn } from "cn"

/** v2/Row · label left (15 regular, secondary), value right (15 semibold), bottom divider. */
function DataRow({
  label,
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode; value?: React.ReactNode }) {
  return (
    <div
      className={cn("flex w-full items-start justify-between gap-4 border-b border-border-subtle py-[13px] text-[15px]", className)}
      {...props}
    >
      <span className="font-normal text-text-secondary">{label}</span>
      {value != null && <span className="text-right font-semibold text-text-primary">{value}</span>}
    </div>
  )
}

export { DataRow }
