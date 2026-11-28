import * as React from "react"
import { cn } from "cn"
import { PulseLogo } from "./pulse-logo"

/**
 * Screen header from the frames: a 44px row with a round button on each side
 * (usually Back and Help), the screen name centred at the bottom and the small
 * PULSE wordmark centred at the top. PhoneScreen renders it for every screen.
 */
function ScreenHeader({
  left,
  title,
  right,
  logo = true,
  tone = "default",
  className,
}: {
  /** usually <RoundButton icon="back" /> or icon="close" */
  left?: React.ReactNode
  /** short screen name, e.g. "Profile". Leave it out rather than repeating "PULSE" under the wordmark. */
  title?: React.ReactNode
  /** usually <RoundButton icon="help" /> */
  right?: React.ReactNode
  /** small PULSE wordmark at the top */
  logo?: boolean
  /** "inverse" for dark screens (navy, brand, accent backgrounds) */
  tone?: "default" | "inverse"
  className?: string
}) {
  const inverse = tone === "inverse"
  // The wordmark already says PULSE: never repeat it as the screen name.
  const name = logo && typeof title === "string" && title.trim().toUpperCase() === "PULSE" ? null : title
  return (
    <header className={cn("relative grid h-11 shrink-0 grid-cols-[44px_1fr_44px] items-center gap-3", className)}>
      {logo && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
          <PulseLogo className={cn("h-3.5", inverse ? "text-text-inverse" : "text-indigo-500")} />
        </div>
      )}
      <div>{left}</div>
      <div
        className={cn(
          "self-end truncate pb-1 text-center text-[15px] font-medium",
          inverse ? "text-text-inverse" : "text-text-primary"
        )}
      >
        {name}
      </div>
      <div className="flex justify-end">{right}</div>
    </header>
  )
}

export { ScreenHeader }
