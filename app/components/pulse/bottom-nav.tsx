import * as React from "react"
import Link from "next/link"
import { cn } from "cn"
import { Icon } from "./icon"

/**
 * v2/Nav · floating navy bar: Home · Turn on (shield ✓, or shield ✕ when covered) · History.
 * The main action is a 92px button raised above the bar; an empty slot keeps it clear of the side buttons.
 */
function BottomNav({
  tab = "home",
  covered = false,
  homeHref = "/s/04-1",
  actionHref = "/s/05-1",
  historyHref = "/s/10-1",
  className,
}: {
  tab?: "home" | "history" | "none"
  covered?: boolean
  homeHref?: string
  actionHref?: string
  historyHref?: string
  className?: string
}) {
  const side = (active: boolean) =>
    cn(
      "flex size-11 items-center justify-center rounded-full transition-colors",
      active ? "bg-surface-card text-text-primary" : "bg-surface-inverse-raised text-text-inverse-muted hover:text-text-inverse"
    )
  return (
    <nav
      aria-label="Main"
      className={cn("relative flex items-center rounded-[36px] bg-surface-inverse px-2 py-[7px]", className)}
    >
      <Link href={homeHref} aria-label="Home" aria-current={tab === "home" ? "page" : undefined} className={side(tab === "home")}>
        <Icon name="home" />
      </Link>
      <span aria-hidden className="w-[116px] shrink-0" />
      <Link
        href={actionHref}
        aria-label={covered ? "Stop cover" : "Turn on cover"}
        className={cn(
          "absolute top-1/2 left-1/2 flex size-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-[6px] ring-surface-page transition-colors",
          covered ? "bg-surface-info text-surface-brand" : "bg-surface-accent text-text-on-accent hover:bg-indigo-600"
        )}
      >
        <Icon name={covered ? "shield-x" : "shield"} box={40} />
      </Link>
      <Link href={historyHref} aria-label="History" aria-current={tab === "history" ? "page" : undefined} className={side(tab === "history")}>
        <Icon name="history" />
      </Link>
    </nav>
  )
}

export { BottomNav }
