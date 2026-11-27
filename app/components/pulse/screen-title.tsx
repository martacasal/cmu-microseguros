import * as React from "react"
import { cn } from "cn"

/**
 * Two-tone screen title from the frames: first line primary, second line secondary
 * ("Not covered / yet", "Football / at Parque da Cidade"). 36px bold, -0.03em.
 */
function ScreenTitle({
  children,
  muted,
  size = 36,
  eyebrow,
  tone = "default",
  className,
}: {
  children: React.ReactNode
  muted?: React.ReactNode
  size?: number
  eyebrow?: React.ReactNode
  tone?: "default" | "inverse"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {eyebrow && (
        <p className={cn("text-[15px]", tone === "inverse" ? "text-text-inverse-muted" : "text-text-secondary")}>{eyebrow}</p>
      )}
      <h1 className="leading-[1.04] font-bold tracking-[-0.03em]" style={{ fontSize: size }}>
        <span className={tone === "inverse" ? "text-text-inverse" : "text-text-primary"}>{children}</span>
        {muted && (
          <>
            <br />
            <span className={tone === "inverse" ? "text-slate-200/70" : "text-text-secondary"}>{muted}</span>
          </>
        )}
      </h1>
    </div>
  )
}

export { ScreenTitle }
