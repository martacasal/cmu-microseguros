import * as React from "react"
import Link from "next/link"
import { cn } from "cn"
import { Icon } from "./icon"

/** v2/Nav · floating navy bar: Home · Turn on (+, or shield when covered) · History. */
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
      className={cn("flex items-center gap-3 rounded-[36px] bg-surface-inverse px-2 py-[7px]", className)}
    >
      <Link href={homeHref} aria-label="Home" aria-current={tab === "home" ? "page" : undefined} className={side(tab === "home")}>
        <Icon name="home" />
      </Link>
      <Link
        href={actionHref}
        aria-label={covered ? "Active cover" : "Turn on cover"}
        className={cn(
          "flex size-[58px] items-center justify-center rounded-full transition-colors",
          covered ? "bg-surface-info text-surface-brand" : "bg-surface-accent text-text-on-accent hover:bg-coral-600"
        )}
      >
        <Icon name={covered ? "shield" : "plus"} box={26} />
      </Link>
      <Link href={historyHref} aria-label="History" aria-current={tab === "history" ? "page" : undefined} className={side(tab === "history")}>
        <Icon name="history" />
      </Link>
    </nav>
  )
}

export { BottomNav }
