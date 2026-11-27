import * as React from "react"
import { cn } from "cn"

// Three separate wave strands; each morphs between two curled poses (same path structure).
const WAVES = [
  { x: 4, h: 44, dur: 3.2, delay: 0 },
  { x: 42, h: 56, dur: 2.8, delay: 0.5 },
  { x: 80, h: 36, dur: 3.6, delay: 1 },
]

function strand(x: number, h: number, sway: number, curl: number) {
  const base = 64
  const top = base - h
  return [
    `M${x},${base}`,
    `C${x + 8},${base} ${x + 8 + sway},${top} ${x + 16 + sway},${top}`,
    `C${x + 24 + sway},${top} ${x + 24},${base} ${x + 32 + curl},${base - 4}`,
    `C${x + 38 + curl},${base - 8} ${x + 36 + curl},${base - 14 - curl} ${x + 31 + curl},${base - 12}`,
  ].join(" ")
}

/** Pulse wave motif (01.1 Welcome): three separate waves that stay in place, curling and waving. */
function PulseWaves({
  height = 120,
  className,
}: {
  height?: number
  className?: string
}) {
  const id = React.useId()
  return (
    <div
      className={cn("flex w-full justify-center", className)}
      style={{ height }}
      aria-hidden
    >
      <svg viewBox="0 0 120 70" className="h-full w-auto" fill="none">
        <defs>
          {WAVES.map((w, i) => (
            <linearGradient
              key={i}
              id={`${id}-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={w.x}
              x2={w.x + 36}
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {WAVES.map((w, i) => {
          const a = strand(w.x, w.h, -3, 0)
          const b = strand(w.x, w.h * 0.82, 4, 4)
          return (
            <path
              key={i}
              d={a}
              stroke={`url(#${id}-${i})`}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="d"
                values={`${a};${b};${a}`}
                dur={`${w.dur}s`}
                begin={`${w.delay}s`}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              />
            </path>
          )
        })}
      </svg>
    </div>
  )
}

export { PulseWaves }
