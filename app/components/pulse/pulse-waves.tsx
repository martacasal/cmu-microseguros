import * as React from "react"
import { cn } from "cn"

const W = 120
const MID = 36
const FRAMES = 24
const SAMPLES = 64

// Each strand blends several waves with irregular spatial frequencies and different time harmonics,
// so the two strands drift in and out of each other instead of mirroring a single sine.
const STRANDS = [
  {
    opacity: 1,
    color: "#fff",
    c: [
      [1.7, 1, 0.9, 0],
      [3.3, -2, 0.45, 1.3],
      [5.1, 3, 0.2, 2.1],
    ],
  },
  {
    opacity: 1,
    color: "#ffd84d",
    c: [
      [2.1, 1, 0.85, 2.6],
      [3.9, 2, 0.5, 0.4],
      [6.3, -3, 0.22, 4.2],
    ],
  },
]

function strand(c: number[][], phase: number) {
  const pts: string[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const env = Math.sin(Math.PI * Math.min(1, t ** 0.85)) ** 0.9
    let v = 0
    for (const [k, h, amp, off] of c)
      v += amp * Math.sin(t * Math.PI * k + h * phase + off)
    const y = MID + 23 * env * v
    pts.push(
      `${i === 0 ? "M" : "L"}${(4 + t * (W - 8)).toFixed(2)},${y.toFixed(2)}`
    )
  }
  return pts.join(" ")
}

const frames = (c: number[][]) =>
  Array.from({ length: FRAMES + 1 }, (_, f) =>
    strand(c, (f / FRAMES) * Math.PI * 2)
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
  const strands = STRANDS
  return (
    <div
      className={cn("flex w-full justify-center", className)}
      style={{ height }}
      aria-hidden
    >
      <svg
        viewBox={`4 0 ${W - 8} 72`}
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          {strands.map((st, i) => (
            <linearGradient
              key={i}
              id={`${id}-${i}`}
              gradientUnits="userSpaceOnUse"
              x1="4"
              x2={W - 4}
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor={st.color} stopOpacity="1" />
              <stop offset="1" stopColor={st.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {strands.map((st, i) => (
          <path
            key={i}
            d={strand(st.c, 0)}
            stroke={`url(#${id}-${i})`}
            strokeOpacity={st.opacity}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="d"
              values={frames(st.c)}
              dur="7s"
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  )
}

export { PulseWaves }
