import * as React from "react"
import { cn } from "cn"
import { PulseLogo } from "@/components/pulse/pulse-logo"

/**
 * A PULSE screen, laid out from the 390×844 Figma frames (Section 1, 254:4964) and made responsive:
 * - mobile (< 768): as in Figma — status bar, header, content (24px gutter), footer pinned to the
 *   bottom, floating bottom nav.
 * - tablet (768–1023): full width, no fake status bar; header, content and footer share a centred
 *   640px column; the footer follows the content; floating bottom nav.
 * - desktop (≥ 1024): column of 720px, growing to 880 (xl 1280), 1040 (2xl 1536) and 1200 (3xl 1920); the nav stays horizontal.
 * - above 1920: the screen is a 1920px frame centred in the window, with free space on both sides.
 */
type Tone = "default" | "inverse" | "brand" | "accent" | "info"

/** Shared centred column: full width with a 24px gutter on mobile, then 640 / 720 / 880 / 1040 / 1200px from md / lg / xl / 2xl / 3xl (1920). */
const COLUMN =
  "mx-auto w-full px-6 md:px-8 md:max-w-[640px] lg:max-w-[720px] xl:max-w-[880px] 2xl:max-w-[1040px] 3xl:max-w-[1200px]"

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
  logo = true,
  pinFooter = false,
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
  /** small PULSE wordmark at the top of the screen */
  logo?: boolean
  /** keep the footer at the bottom of the window on every size (chat composers) */
  pinFooter?: boolean
  className?: string
  contentClassName?: string
}) {
  const dark = tone === "inverse" || tone === "brand" || tone === "accent"
  const logoEl = <PulseLogo className={cn("h-3.5", dark ? "text-text-inverse" : "text-indigo-500")} />
  return (
    <div
      data-tone={tone}
      className={cn(
        "relative mx-auto flex min-h-svh w-full max-w-[1920px] flex-col overflow-x-clip",
        toneBg[tone],
        className
      )}
    >
      {statusBar && (
        <div className="flex h-[52px] shrink-0 items-start justify-between px-[30px] pt-4 text-[15px] leading-[1.32] font-semibold md:hidden">
          <span>9:41</span>
          <span className="pt-[3px] text-[11px] font-medium">●●● ▮</span>
        </div>
      )}
      {logo && !header && (
        <div className={cn(COLUMN, "flex h-5 shrink-0 items-center justify-center md:mt-6")}>
          {logoEl}
        </div>
      )}
      {header && (
        <header className={cn(COLUMN, "relative grid h-11 shrink-0 grid-cols-[44px_1fr_44px] items-center gap-3 md:mt-8")}>
          {logo && <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">{logoEl}</div>}
          <div>{left}</div>
          <div className={cn("self-end truncate pb-1 text-center text-[15px] font-medium", dark ? "text-text-inverse" : "text-text-primary")}>
            {title}
          </div>
          <div className="flex justify-end">{right}</div>
        </header>
      )}
      <main
        className={cn(
          COLUMN,
          "flex flex-1 flex-col gap-3.5 pt-5 md:pt-8",
          !pinFooter && "md:flex-none",
          nav ? "pb-36" : "pb-6 md:pb-8",
          contentClassName
        )}
      >
        {children}
      </main>
      {footer && <footer className={cn(COLUMN, "flex shrink-0 flex-col gap-2 pb-[30px] md:pb-12")}>{footer}</footer>}
      {nav && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[54px] z-30 flex justify-center *:pointer-events-auto">
          {nav}
        </div>
      )}
    </div>
  )
}

export { PhoneScreen }
