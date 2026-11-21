import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** B2/CTA · full-width pill with label left and price right. */
const ctaVariants = cva(
  "group/cta inline-flex h-16 w-full items-center justify-between gap-3 rounded-full px-6 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:bg-surface-muted disabled:text-gray-500",
  {
    variants: {
      variant: {
        default: "bg-surface-inverse text-text-inverse hover:bg-surface-inverse-raised",
        brand: "bg-surface-brand text-text-inverse hover:bg-surface-brand/90",
        danger: "bg-surface-danger text-text-inverse hover:bg-red-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function CtaButton({
  className,
  variant,
  price,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof ctaVariants> & { price?: React.ReactNode }) {
  return (
    <button data-slot="cta" className={cn(ctaVariants({ variant }), className)} {...props}>
      <span className="type-title">{children}</span>
      {price != null && (
        <span className="type-body-m text-text-inverse-muted group-disabled/cta:text-gray-500">
          {price}
        </span>
      )}
    </button>
  )
}

export { CtaButton, ctaVariants }
