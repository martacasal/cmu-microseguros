import * as React from "react"
import { cn } from "cn"

/** Risk pill · yellow warning with "!" marker ("Medium risk · contact, knee and ankle"). */
function RiskBanner({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("inline-flex items-center gap-2 rounded-full bg-surface-warning py-1.5 pr-4 pl-1.5 type-label text-text-primary", className)}
      {...props}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-surface-brand text-xs font-bold text-white">!</span>
      {children}
    </div>
  )
}

export { RiskBanner }
