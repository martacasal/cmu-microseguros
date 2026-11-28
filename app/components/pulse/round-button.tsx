import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Icon, type IconName } from "./icon"
import { LinkOrButton, type LinkOrButtonProps } from "./link-or-button"

/** v2/Botão redondo · 44px circle (back, close, help, profile) and 56px SOS. */
const roundButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "size-11 bg-surface-card text-text-primary hover:bg-surface-subtle",
        muted: "size-11 bg-surface-muted text-text-primary hover:bg-[color-mix(in_oklch,var(--surface-muted),black_5%)]",
        inverse: "size-11 bg-surface-inverse-raised text-text-inverse hover:bg-indigo-500",
        sos: "size-14 bg-surface-danger text-[14px] font-bold text-text-inverse hover:bg-red-700",
        minus: "size-12 bg-surface-muted text-[22px] text-text-primary hover:bg-[color-mix(in_oklch,var(--surface-muted),black_5%)]",
        plus: "size-12 bg-surface-accent text-[22px] text-text-on-accent hover:bg-indigo-600",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function RoundButton({
  className,
  variant,
  icon,
  children,
  ...props
}: LinkOrButtonProps & VariantProps<typeof roundButtonVariants> & { icon?: IconName }) {
  return (
    <LinkOrButton
      data-slot="round-button"
      className={cn(roundButtonVariants({ variant }), className)}
      {...props}
    >
      {icon ? <Icon name={icon} /> : children}
    </LinkOrButton>
  )
}

export { RoundButton, roundButtonVariants }
