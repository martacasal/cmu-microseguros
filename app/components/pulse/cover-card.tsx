import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/** B2/Card · "Your cover" card in 4 surfaces. */
const coverCardVariants = cva("flex flex-col gap-1 rounded-md p-4 text-left", {
  variants: {
    variant: {
      default: "bg-surface-card text-text-primary",
      brand: "bg-surface-brand text-text-inverse",
      info: "bg-surface-info text-text-primary",
      muted: "bg-surface-muted text-text-primary",
    },
  },
  defaultVariants: { variant: "default" },
})

function CoverCard({
  className,
  variant,
  overline,
  title,
  description,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof coverCardVariants> & {
    overline?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
  }) {
  const sub = variant === "brand" ? "text-text-inverse-muted" : variant === "info" ? "text-text-secondary-on-info" : "text-text-secondary"
  return (
    <div data-slot="cover-card" className={cn(coverCardVariants({ variant }), className)} {...props}>
      {overline && <span className={cn("type-overline", sub)}>{overline}</span>}
      <span className="type-body-l-strong">{title}</span>
      {description && <span className={cn("type-caption", sub)}>{description}</span>}
    </div>
  )
}

export { CoverCard, coverCardVariants }
