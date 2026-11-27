import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { LinkOrButton, type LinkOrButtonProps } from "./link-or-button"

/** v2/CTA · 64px pill, label left (17 semibold) and value right (15 medium). */
const ctaVariants = cva(
  "group/cta inline-flex h-16 w-full shrink-0 items-center justify-between gap-3.5 rounded-full px-6 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:bg-surface-muted disabled:text-gray-500",
  {
    variants: {
      variant: {
        default: "bg-surface-inverse text-text-inverse hover:bg-surface-inverse-raised",
        brand: "bg-surface-brand text-text-inverse hover:bg-surface-brand/90",
        accent: "bg-surface-accent text-text-on-accent hover:bg-indigo-600",
        /** Ends / cancels something · yellow */
        end: "bg-surface-warning text-navy-950 hover:bg-surface-warning/85",
        danger: "bg-surface-danger text-text-inverse hover:bg-red-700",
        /** On dark screens (Welcome): white pill, navy text */
        inverse: "justify-center bg-surface-card text-text-primary hover:bg-surface-subtle",
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
}: LinkOrButtonProps & VariantProps<typeof ctaVariants> & { price?: React.ReactNode }) {
  return (
    <LinkOrButton data-slot="cta" className={cn(ctaVariants({ variant }), className)} {...props}>
      <span className={cn("flex-1 text-[17px] leading-[1.3] font-semibold", price == null && "text-center")}>{children}</span>
      {price != null && (
        <span className="text-[15px] font-medium text-text-inverse-muted group-disabled/cta:text-gray-500">
          {price}
        </span>
      )}
    </LinkOrButton>
  )
}

/** v2/Botão secundário · 56px outlined pill. */
function SecondaryButton({ className, ...props }: LinkOrButtonProps) {
  return (
    <LinkOrButton
      className={cn(
        "inline-flex h-14 w-full shrink-0 items-center justify-center rounded-full border-[1.5px] border-navy-950 text-[16px] font-semibold text-text-primary outline-none transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring/40 disabled:border-border disabled:text-gray-500",
        className
      )}
      {...props}
    />
  )
}

/** v2/Botão texto · 44px text-only action. */
function TextButton({ className, ...props }: LinkOrButtonProps) {
  return (
    <LinkOrButton
      className={cn(
        "inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full text-[16px] font-semibold text-text-primary outline-none transition-colors hover:bg-surface-muted/60 focus-visible:ring-3 focus-visible:ring-ring/40",
        className
      )}
      {...props}
    />
  )
}

export { CtaButton, SecondaryButton, TextButton, ctaVariants }
