import * as React from "react"
import Link from "next/link"
import { cn } from "cn"
import { MaskIcon } from "@/components/pulse"

export type F10Icon = "alert" | "ball" | "wave" | "bike" | "heart" | "bell" | "file" | "user20"

/** 20px line icon from /icons/f10 (Figma icon/*), drawn in currentColor. */
export function F10Icon({ name }: { name: F10Icon }) {
  return <MaskIcon src={`/icons/f10/${name}.svg`} width={20} height={20} box={20} />
}

/** List item: 40px round icon, title (15 semibold) + sub (13 secondary), trailing chevron or mark. */
export function ListItem({
  icon,
  iconTone = "muted",
  title,
  sub,
  trailing,
  href,
  last,
}: {
  icon: F10Icon
  iconTone?: "muted" | "inverse"
  title: React.ReactNode
  sub: React.ReactNode
  trailing?: React.ReactNode
  href?: string
  last?: boolean
}) {
  const body = (
    <>
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          iconTone === "inverse" ? "bg-surface-inverse text-text-inverse" : "bg-surface-muted text-text-primary"
        )}
      >
        <F10Icon name={icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left leading-[1.32]">
        <span className="text-[15px] font-semibold text-text-primary">{title}</span>
        <span className="text-[13px] text-text-secondary">{sub}</span>
      </span>
      {trailing ?? (
        <span className="text-text-secondary">
          <MaskIcon src="/icons/f10/chevron.svg" width={18} height={18} box={18} />
        </span>
      )}
    </>
  )
  const cls = cn("flex w-full items-center gap-3 py-3", !last && "border-b border-border-subtle")
  return href ? (
    <Link href={href} className={cn(cls, "transition-opacity hover:opacity-80")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

/** White rounded list container (px 16, py 6). */
export function List({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col rounded-[28px] bg-surface-card px-4 py-1.5">{children}</div>
}

/** Bento stat card: optional overline, 40px bold value, optional caption. */
export function StatCard({
  variant = "card",
  overline,
  value,
  caption,
  className,
}: {
  variant?: "brand" | "card"
  overline?: React.ReactNode
  value: React.ReactNode
  caption?: React.ReactNode
  className?: string
}) {
  const brand = variant === "brand"
  const sub = brand ? "text-text-inverse-muted" : "text-text-secondary"
  return (
    <div
      className={cn(
        "flex h-[120px] min-w-0 flex-1 flex-col gap-1.5 overflow-hidden rounded-[28px] p-[18px]",
        brand ? "bg-surface-brand text-text-inverse" : "bg-surface-card text-text-primary",
        className
      )}
    >
      {overline && <p className={cn("text-[11px] leading-[1.32] font-semibold tracking-[0.06em] uppercase", sub)}>{overline}</p>}
      <p className="text-[40px] leading-[1.04] font-bold tracking-[-0.03em]">{value}</p>
      {caption && <p className={cn("text-[14px] leading-[1.32] font-medium", sub)}>{caption}</p>}
    </div>
  )
}

/** Header title in these frames is 15 medium. */
export function HeaderTitle({ children }: { children: React.ReactNode }) {
  return <span className="font-medium">{children}</span>
}
