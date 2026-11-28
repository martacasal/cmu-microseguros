"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { Icon } from "./icon"

const ui = { type: "spring", stiffness: 305, damping: 33 } as const
const lively = { type: "spring", stiffness: 622, damping: 17 } as const

/** Seconds the button must be held to stop cover. */
const HOLD = 1
/** The ring sits in the 6px page-coloured gap around the 92px button. */
const SIZE = 104
const R = 49
const CIRCUMFERENCE = 2 * Math.PI * R

type State = "idle" | "holding" | "stopped"

const LABELS: Record<State | "hint", string> = {
  idle: "",
  hint: "Hold to stop",
  holding: "Keep holding",
  stopped: "Cover stopped",
}

/**
 * Nav main action while covered: press and hold for HOLD seconds to stop cover.
 * A ring fills around the button; releasing early springs it back and shows a hint.
 */
function HoldToStop({ href }: { href: string }) {
  const router = useRouter()
  const [state, setState] = React.useState<State>("idle")
  const [hint, setHint] = React.useState(false)
  const stopped = state === "stopped"

  const stop = () => {
    navigator.vibrate?.(12)
    setState("stopped")
  }

  // Let the confirmation land, then go on
  React.useEffect(() => {
    if (!stopped) return
    const t = setTimeout(() => router.push(href), 650)
    return () => clearTimeout(t)
  }, [stopped, href, router])

  React.useEffect(() => {
    if (!hint) return
    const t = setTimeout(() => setHint(false), 1600)
    return () => clearTimeout(t)
  }, [hint])

  const label = state === "idle" ? (hint ? "hint" : null) : state

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      <AnimatePresence>
        {label && (
          <motion.p
            key={label}
            aria-live="polite"
            className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-full bg-surface-inverse px-3 py-1 text-sm font-medium whitespace-nowrap text-text-inverse"
            initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", y: -2, transition: { duration: 0.15 } }}
            transition={ui}
          >
            {LABELS[label]}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.svg
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        initial={false}
        animate={stopped ? "stopped" : "rest"}
        variants={{
          rest: { scale: 1, opacity: 1, transition: { duration: 0 } },
          // The ring pulses out as cover stops
          stopped: { scale: [1, 1.12], opacity: [1, 0], transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
        }}
      >
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          className={cn("origin-center -rotate-90 transition-colors", stopped ? "stroke-surface-danger" : "stroke-indigo-950")}
          initial={false}
          animate={state === "idle" ? "rest" : "filled"}
          variants={{
            rest: { strokeDashoffset: CIRCUMFERENCE, opacity: 0, transition: ui },
            filled: {
              strokeDashoffset: 0,
              opacity: 1,
              transition: { strokeDashoffset: { duration: HOLD, ease: "linear" }, opacity: { duration: 0.1 } },
            },
          }}
          // Ring full after HOLD seconds: stop while still held
          onAnimationComplete={(definition) => definition === "filled" && state === "holding" && stop()}
        />
      </motion.svg>

      {/*
       * tap={{ hold }} turns a press shorter than HOLD into a cancel,
       * so onTapCancel fires and the ring springs back.
       */}
      <motion.button
        type="button"
        aria-label="Stop cover (press and hold)"
        className={cn(
          "absolute top-1/2 left-1/2 -mt-[46px] -ml-[46px] flex size-[92px] cursor-pointer touch-none items-center justify-center rounded-full ring-[6px] ring-surface-page transition-colors [-webkit-touch-callout:none]",
          "focus-visible:outline-2 focus-visible:outline-offset-[10px] focus-visible:outline-indigo-500",
          stopped ? "bg-surface-danger text-text-inverse" : "bg-surface-warning text-indigo-950"
        )}
        tap={{ hold: HOLD }}
        onTapStart={() => {
          if (stopped) return
          setHint(false)
          setState("holding")
        }}
        onTapCancel={() => {
          if (stopped) return
          setState("idle")
          setHint(true)
        }}
        initial={false}
        animate="rest"
        whileTap={stopped ? undefined : "pressed"}
        variants={{ rest: { scale: 1 }, pressed: { scale: 0.92 } }}
        transition={lively}
      >
        <motion.span
          className="inline-flex"
          animate={stopped ? { rotate: [0, -12, 10, -6, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
          transition={stopped ? { duration: 0.45 } : lively}
        >
          <Icon name="shield-x" box={40} />
        </motion.span>
      </motion.button>
    </div>
  )
}

export { HoldToStop }
