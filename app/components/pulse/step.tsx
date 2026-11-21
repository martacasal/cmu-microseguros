import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"

type StepState = "done" | "now" | "next"

/** B2/Step · timeline row with status marker + tag. */
function Step({
  state,
  title,
  description,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  state: StepState
  title: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <div data-slot="step" data-state={state} className={cn("flex items-center gap-3", className)} {...props}>
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          state === "done" && "bg-control-on text-white",
          state === "now" && "border-[1.5px] border-surface-accent-strong after:size-2 after:rounded-full after:bg-surface-accent-strong",
          state === "next" && "border-[1.5px] border-border-strong"
        )}
      >
        {state === "done" && <CheckIcon className="size-3" strokeWidth={3} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className={cn("type-body-s-strong", state === "next" && "text-text-secondary")}>{title}</div>
        {description && <div className="type-caption text-text-secondary">{description}</div>}
      </div>
      <Badge variant={state === "now" ? "now" : "done"}>
        {state === "done" ? "Done" : state === "now" ? "Now" : "Next"}
      </Badge>
    </div>
  )
}

export { Step, type StepState }
