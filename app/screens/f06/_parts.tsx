import * as React from "react"
import Link from "next/link"
import { cn } from "cn"
import { LocationMap } from "@/components/pulse/location-map"

/** "Why this price" card: label · bar · amount rows (06.1 and 06.3). Fill = share of the track. */
export function PriceBars({
  title,
  rows,
  href,
}: {
  title: string
  rows: { label: string; fill: number; value?: string }[]
  href?: string
}) {
  const body = (
    <>
      <p className="text-[16px] leading-[1.32] font-semibold">{title}</p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-2.5">
          <p className="w-[108px] shrink-0 text-[14px] leading-[1.32] font-medium">{r.label}</p>
          <div className="h-2 flex-1 overflow-hidden rounded-[4px] bg-progress-track">
            <div className="h-2 rounded-[4px] bg-surface-brand" style={{ width: `${r.fill * 100}%` }} />
          </div>
          <p className="shrink-0 text-[13px] leading-[1.32] font-semibold text-text-secondary">{r.value ?? "€X.XX"}</p>
        </div>
      ))}
    </>
  )
  const cls = cn("flex w-full flex-col gap-3 rounded-[28px] bg-surface-card px-5 py-[18px] text-left text-text-primary", href && "transition-opacity hover:opacity-90")
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

/** Map card showing the position used for pricing (vector map). */
export function LocationCard({
  lat,
  lng,
  note,
}: {
  lat: number
  lng: number
  note: string
}) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 rounded-[28px] bg-surface-card p-3 text-text-primary">
      <div className="relative h-[132px] shrink-0 overflow-hidden rounded-[20px] bg-progress-track">
        <LocationMap lat={lat} lng={lng} className="absolute inset-0" />
        <span className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-surface-brand shadow-md" />
        <span className="absolute right-2 bottom-1 rounded bg-white/80 px-1 text-[9px] text-text-secondary">© OpenStreetMap</span>
      </div>
      <div className="px-2 pb-1">
        <p className="text-[13px] leading-[1.32] text-text-secondary">{note}</p>
      </div>
    </div>
  )
}

/** Covered (periwinkle) / not covered (sand) bento card used on 06.1 and 06.2. */
export function CoverItem({
  covered,
  title,
  className,
  children,
  footer,
  href,
}: {
  covered: boolean
  title: React.ReactNode
  className?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  href?: string
}) {
  const sub = covered ? "text-text-secondary-on-info" : "text-text-secondary"
  const body = (
    <>
      <p className="text-[17px] leading-[1.32] font-semibold">
        {covered ? "✓" : "✕"} {title}
      </p>
      {children && <div className={cn("text-[14px] leading-[1.32] font-medium", sub)}>{children}</div>}
      {footer && <p className={cn("mt-auto text-[12px] leading-[1.32] font-medium", sub)}>{footer}</p>}
    </>
  )
  const cls = cn(
    "flex flex-col gap-1.5 overflow-hidden rounded-[28px] p-[18px] text-left text-text-primary",
    covered ? "bg-surface-info" : "bg-surface-muted",
    href && "transition-opacity hover:opacity-90",
    className
  )
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}
