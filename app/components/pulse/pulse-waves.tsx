import * as React from "react"
import { cn } from "cn"

const W = 120
const MID = 36
const FRAMES = 16
const SAMPLES = 48

// Sine strand with a bell envelope; phase shifts make it travel along its own length without moving the shape.
function strand(phase: number) {
  const pts: string[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const env = Math.sin(Math.PI * t) ** 0.8
    const y = MID + 22 * env * Math.sin(t * Math.PI * 4 + phase)
    pts.push(
      `${i === 0 ? "M" : "L"}${(4 + t * (W - 8)).toFixed(2)},${y.toFixed(2)}`
    )
  }
  return pts.join(" ")
}

const frames = (offset: number) =>
  Array.from({ length: FRAMES + 1 }, (_, f) =>
    strand(offset + (f / FRAMES) * Math.PI * 2)
  ).join(";")

/** Pulse wave motif (01.1 Welcome): two waves that stay in place and intertwirl. */
function PulseWaves({
  height = 120,
  className,
}: {
  height?: number
  className?: string
}) {
  const id = React.useId()
  const strands = [
    { offset: 0, opacity: 1 },
    { offset: Math.PI, opacity: 0.65 },
  ]
  return (
    <div
      className={cn("flex w-full justify-center", className)}
      style={{ height }}
      aria-hidden
    >
      <svg viewBox={`0 0 ${W} 72`} className="h-full w-full" fill="none">
        <defs>
          <linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            x1="4"
            x2={W - 4}
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {strands.map((st, i) => (
          <path
            key={i}
            d={strand(st.offset)}
            stroke={`url(#${id})`}
            strokeOpacity={st.opacity}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="d"
              values={frames(st.offset)}
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  )
}

export { PulseWaves }
