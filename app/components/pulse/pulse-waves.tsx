import * as React from "react"
import { cn } from "cn"

const W = 120
const MID = 36
const FRAMES = 60
const SAMPLES = 72

// Three ribbons share a flowing centre line (arms swelling and sweeping) and twist around it:
// the half-gap between them passes through zero, so they cross and pirouette like a dancer's ribbons.
const STRANDS = [
  { sign: 1, opacity: 1, color: "#fff" },
  { sign: -1, opacity: 1, color: "#ffd84d" },
  { sign: 0, opacity: 0.8, color: "#8fa8ff" },
]

function strand(sign: number, phase: number) {
  const pts: string[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const env = Math.sin(Math.PI * t) ** 0.9
    const lift = 0.7 + 0.3 * Math.sin(phase + 0.6)
    const centre =
      9 * Math.sin(t * Math.PI * 1.5 - phase + 0.4) +
      3 * Math.sin(t * Math.PI * 2.7 - 2 * phase + 1.7)
    const twirl =
      13 * Math.cos(t * Math.PI * 2.2 - phase) +
      3 * Math.sin(t * Math.PI * 3.4 + 2 * phase + 0.8)
    const y = MID + env * (lift * centre + sign * twirl)
    pts.push(
      `${i === 0 ? "M" : "L"}${(4 + t * (W - 8)).toFixed(2)},${y.toFixed(2)}`
    )
  }
  return pts.join(" ")
}

const frames = (sign: number) =>
  Array.from({ length: FRAMES + 1 }, (_, f) =>
    strand(sign, (f / FRAMES) * Math.PI * 2)
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
        viewBox={`4 8 ${W - 8} 56`}
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
            d={strand(st.sign, 0)}
            stroke={`url(#${id}-${i})`}
            strokeOpacity={st.opacity}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="d"
              values={frames(st.sign)}
              dur="14s"
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  )
}

export { PulseWaves }
