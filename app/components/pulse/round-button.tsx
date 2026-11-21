import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** B2/Round button · 44px circular icon button (back, close, help, profile, SOS). */
const roundButtonVariants = cva(
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 disabled:opacity-50 [&_svg]:size-5",
  {
    variants: {
      variant: {
        default: "bg-surface-card text-text-primary hover:bg-surface-subtle",
        muted: "bg-surface-muted text-text-primary hover:bg-[color-mix(in_oklch,var(--surface-muted),black_5%)]",
        sos: "bg-surface-danger type-label text-text-inverse hover:bg-red-700",
        minus: "bg-surface-muted text-text-primary hover:bg-[color-mix(in_oklch,var(--surface-muted),black_5%)]",
        plus: "bg-surface-accent text-text-on-accent hover:bg-coral-600",
      },
      size: { default: "size-11", lg: "size-12" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function RoundButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof roundButtonVariants>) {
  return (
    <button
      data-slot="round-button"
      className={cn(roundButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { RoundButton, roundButtonVariants }
