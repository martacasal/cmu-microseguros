import * as React from "react"
import { cn } from "cn"

/**
 * PULSE sport icons · 24px grid, 2px round stroke, currentColor.
 * Paths from Tabler Icons (MIT): run, ball-football, bike, wave-sine, trekking, dots.
 * Gear for wearables (clothes, trainers) is never a modality, so it has no icon here.
 */
const PATHS = {
  running: [
    "M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M4 17l5 1l.75 -1.5",
    "M15 21l0 -4l-4 -3l1 -6",
    "M7 12l0 -3l5 -1l3 3l3 1",
  ],
  football: [
    "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z",
    "M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45",
  ],
  cycling: [
    "M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
    "M12 19l0 -4l-3 -3l5 -4l2 3l3 0",
    "M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
  surfing: [
    "M21 12h-2c-.894 0 -1.662 -.857 -1.761 -2c-.296 -3.45 -.749 -6 -2.749 -6s-2.5 3.582 -2.5 8s-.5 8 -2.5 8s-2.452 -2.547 -2.749 -6c-.1 -1.147 -.867 -2 -1.763 -2h-2",
  ],
  hiking: [
    "M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M7 21l2 -4",
    "M13 21v-4l-3 -3l1 -6l3 4l3 2",
    "M10 14l-1.827 -1.218a2 2 0 0 1 -.831 -2.15l.28 -1.117a2 2 0 0 1 1.939 -1.515h1.439l4 1l3 -2",
    "M17 12v9",
    "M16 20h2",
  ],
  other: [
    "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  ],
} as const

export type SportName = keyof typeof PATHS
export const SPORT_NAMES = Object.keys(PATHS) as SportName[]

function SportIcon({ name, size = 24, className }: { name: SportName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export { SportIcon }
