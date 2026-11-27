import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Bento / carousel card from the screens (04.x "STEP 1 · Pick", "GETTING STARTED"...).
 * Wireframe black → navy brand, white → white, light grey → sand.
 */
const infoCardVariants = cva("flex flex-col gap-1.5 overflow-hidden rounded-[28px] p-[18px] text-left", {
  variants: {
    variant: {
      brand: "bg-surface-brand text-text-inverse",
      inverse: "bg-surface-inverse text-text-inverse",
      default: "bg-surface-card text-text-primary",
      muted: "bg-surface-muted text-text-primary",
      info: "bg-surface-info text-text-primary",
      accent: "bg-surface-accent text-text-on-accent",
      warning: "bg-surface-warning text-text-primary",
      danger: "bg-surface-danger-subtle text-text-primary",
    },
  },
  defaultVariants: { variant: "default" },
})

const subText = (variant: InfoCardProps["variant"]) =>
  variant === "brand" || variant === "inverse" ? "text-text-inverse-muted" : variant === "accent" ? "text-text-on-accent/70" : "text-text-secondary"

type InfoCardProps = VariantProps<typeof infoCardVariants> & {
  overline?: React.ReactNode
  title?: React.ReactNode
  /** title size in px; Figma uses 20 (bento), 18 (wide) or 17 (carousel) */
  titleSize?: number
  description?: React.ReactNode
  footer?: React.ReactNode
  href?: string
  className?: string
  children?: React.ReactNode
}

function InfoCard({
  variant,
  overline,
  title,
  titleSize = 18,
  description,
  footer,
  href,
  className,
  children,
}: InfoCardProps) {
  const sub = subText(variant)
  const body = (
    <>
      {overline && <span className={cn("text-[11px] font-semibold tracking-[0.06em] uppercase", sub)}>{overline}</span>}
      {title && (
        <span className="leading-[1.12] font-semibold tracking-[-0.015em]" style={{ fontSize: titleSize }}>
          {title}
        </span>
      )}
      {description && <span className={cn("text-[14px] leading-[1.32] font-medium", sub)}>{description}</span>}
      {children}
      {footer && <span className={cn("mt-auto text-[12px] font-medium", sub)}>{footer}</span>}
    </>
  )
  const cls = cn(infoCardVariants({ variant }), href && "transition-opacity hover:opacity-90", className)
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export { InfoCard, infoCardVariants }
