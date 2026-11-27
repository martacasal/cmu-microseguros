import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** v2/Selo · regulatory line with the ASF mark. */
const sealVariants = cva("flex w-full items-center gap-3 rounded-[26px] py-2 pr-4 pl-2", {
  variants: {
    variant: {
      default: "bg-surface-card text-text-secondary",
      plain: "bg-transparent px-0 text-text-secondary",
      inverse: "bg-surface-inverse-raised text-text-inverse-muted",
    },
  },
  defaultVariants: { variant: "default" },
})

function Seal({
  mark = "ASF",
  variant,
  className,
  children = "Insurance issued by [Partner insurer], supervised by ASF.",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof sealVariants> & { mark?: React.ReactNode }) {
  return (
    <div data-slot="seal" className={cn(sealVariants({ variant }), className)} {...props}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-inverse text-[10px] font-bold text-text-inverse">
        {mark}
      </span>
      <p className="flex-1 text-[12px] font-medium">{children}</p>
    </div>
  )
}

export { Seal }
