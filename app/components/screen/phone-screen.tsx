import * as React from "react"
import { cn } from "cn"

/**
 * One 390×844 phone frame from the PULSE Figma (Section 1, 254:4964).
 * Layout: status bar · header (44px buttons at top 52, centred title) · content from top 116
 * with a 24px gutter · footer pinned 30px from the bottom.
 * On a phone it fills the viewport; on wider screens it is centred as a device.
 */
type Tone = "default" | "inverse" | "brand" | "accent" | "info"

const toneBg: Record<Tone, string> = {
  default: "bg-surface-page text-text-primary",
  inverse: "bg-surface-inverse text-text-inverse",
  brand: "bg-surface-brand text-text-inverse",
  accent: "bg-surface-accent text-text-inverse",
  info: "bg-surface-info text-text-primary",
}

function PhoneScreen({
  tone = "default",
  left,
  right,
  title,
  children,
  footer,
  nav,
  statusBar = true,
  header = true,
  className,
  contentClassName,
}: {
  tone?: Tone
  left?: React.ReactNode
  right?: React.ReactNode
  title?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  /** floating element centred at the bottom (BottomNav) */
  nav?: React.ReactNode
  statusBar?: boolean
  header?: boolean
  className?: string
  contentClassName?: string
}) {
  const dark = tone === "inverse" || tone === "brand" || tone === "accent"
  return (
    <div
      data-tone={tone}
      className={cn(
        "relative mx-auto flex min-h-svh w-full max-w-[390px] flex-col overflow-hidden sm:my-8 sm:min-h-[844px] sm:rounded-[44px] sm:shadow-[0_24px_60px_-20px_rgb(19_24_38/0.35)]",
        toneBg[tone],
        className
      )}
    >
      {statusBar && (
        <div className="flex h-[52px] shrink-0 items-start justify-between px-[30px] pt-4 text-[15px] leading-[1.32] font-semibold">
          <span>9:41</span>
          <span className="pt-[3px] text-[11px] font-medium">●●● ▮</span>
        </div>
      )}
      {header && (
        <header className="grid h-11 shrink-0 grid-cols-[44px_1fr_44px] items-center gap-3 px-6">
          <div>{left}</div>
          <div className={cn("truncate text-center text-[15px] font-medium", dark ? "text-text-inverse" : "text-text-primary")}>
            {title}
          </div>
          <div className="flex justify-end">{right}</div>
        </header>
      )}
      <main className={cn("flex flex-1 flex-col gap-3.5 overflow-y-auto px-6 pt-5", nav ? "pb-28" : "pb-6", contentClassName)}>
        {children}
      </main>
      {footer && <footer className="flex shrink-0 flex-col gap-2 px-6 pb-[30px]">{footer}</footer>}
      {nav && <div className="pointer-events-none absolute inset-x-0 bottom-[54px] flex justify-center *:pointer-events-auto">{nav}</div>}
    </div>
  )
}

export { PhoneScreen }
