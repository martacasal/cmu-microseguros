"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

/** B2/Option · full-width radio card (payment methods). Use inside <OptionGroup>. */
function OptionGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return <RadioGroupPrimitive className={cn("grid gap-2.5", className)} {...props} />
}

function Option({
  className,
  children,
  ...props
}: RadioPrimitive.Root.Props & { children: React.ReactNode }) {
  return (
    <RadioPrimitive.Root
      data-slot="option"
      className={cn(
        "group/option flex h-14 w-full items-center gap-3 rounded-md border-[1.5px] border-transparent bg-surface-card px-4 text-left type-body-m text-text-primary outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/40",
        "data-checked:border-control-on data-disabled:bg-surface-subtle data-disabled:text-gray-500",
        className
      )}
      {...props}
    >
      <span className="flex size-5 items-center justify-center rounded-full border-[1.5px] border-border-strong group-data-checked/option:border-control-on group-data-checked/option:bg-control-on group-data-disabled/option:border-slate-200 group-data-disabled/option:group-data-checked/option:bg-gray-500 group-data-disabled/option:group-data-checked/option:border-gray-500">
        <RadioPrimitive.Indicator>
          <CheckIcon className="size-3 text-white" strokeWidth={3} />
        </RadioPrimitive.Indicator>
      </span>
      {children}
    </RadioPrimitive.Root>
  )
}

export { Option, OptionGroup }
