"use client"

import * as React from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { cn } from "cn"

/** B2/Slide to turn on · drag the indigo knob to the end to confirm; becomes "Cover on". */
function SlideToTurnOn({
  label = "Slide to turn on",
  doneLabel = "Cover on",
  on: onProp,
  onTurnOn,
  className,
}: {
  label?: string
  doneLabel?: string
  on?: boolean
  onTurnOn?: () => void
  className?: string
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [x, setX] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [onState, setOnState] = React.useState(false)
  const on = onProp ?? onState
  const startRef = React.useRef(0)

  const maxX = () => (trackRef.current ? trackRef.current.clientWidth - 48 - 8 : 0)

  const finish = () => {
    setOnState(true)
    onTurnOn?.()
  }

  return (
    <div
      ref={trackRef}
      data-on={on ? "" : undefined}
      className={cn(
        "relative flex h-14 w-full items-center rounded-full p-1 select-none transition-colors",
        on ? "bg-surface-info" : "bg-surface-inverse",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center type-body-s-strong transition-opacity",
          on ? "pl-16 text-text-primary" : "justify-center pl-8 text-text-inverse",
          !on && x > 20 && "opacity-40"
        )}
      >
        {on ? doneLabel : label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={on ? doneLabel : label}
        disabled={on}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
            e.preventDefault()
            finish()
          }
        }}
        onPointerDown={(e) => {
          if (on) return
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          startRef.current = e.clientX - x
          setDragging(true)
        }}
        onPointerMove={(e) => {
          if (!dragging) return
          setX(Math.min(Math.max(0, e.clientX - startRef.current), maxX()))
        }}
        onPointerUp={() => {
          setDragging(false)
          if (x >= maxX() * 0.85) finish()
          setX(0)
        }}
        style={{ transform: on ? undefined : `translateX(${x}px)` }}
        className={cn(
          "relative z-10 flex size-12 touch-none items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
          on ? "bg-surface-brand text-white" : "cursor-grab bg-surface-accent text-text-on-accent active:cursor-grabbing",
          !dragging && "transition-transform"
        )}
      >
        {on ? <CheckIcon className="size-5" strokeWidth={3} /> : <ArrowRightIcon className="size-5" />}
      </button>
    </div>
  )
}

export { SlideToTurnOn }
