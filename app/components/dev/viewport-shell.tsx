"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { cn } from "cn"

const BREAKPOINTS = [
  { id: "mobile", label: "Mobile", width: 390 },
  { id: "tablet", label: "Tablet", width: 768 },
  { id: "laptop", label: "Laptop", width: 1024 },
  { id: "desktop", label: "Desktop", width: 1280 },
  { id: "large", label: "Large", width: 1536 },
  { id: "fhd", label: "Full HD", width: 1920 },
  { id: "wide", label: "Wide", width: 2560 },
] as const

const MESSAGE = "pulse:path"

/** Runs inside the iframe: tells the shell which screen is showing so its URL stays in sync. */
function EmbedBridge() {
  const pathname = usePathname()
  React.useEffect(() => {
    window.parent.postMessage({ type: MESSAGE, path: pathname }, window.location.origin)
  }, [pathname])
  return null
}

/** Breakpoint selector outside the page: renders the current screen in an iframe of the chosen width (default Mobile). */
function ViewportShell() {
  const pathname = usePathname()
  const [src] = React.useState(pathname)
  const [bp, setBp] = React.useState<(typeof BREAKPOINTS)[number]>(BREAKPOINTS[0])
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [stage, setStage] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setStage({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== MESSAGE) return
      window.history.replaceState(null, "", e.data.path)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const pad = 24
  const scale = stage.w ? Math.min(1, (stage.w - pad * 2) / bp.width) : 1
  const height = stage.h ? Math.max(1, (stage.h - pad * 2) / scale) : 0

  return (
    <div className="fixed inset-0 flex flex-col bg-sand-200">
      <div role="toolbar" aria-label="Breakpoint" className="flex h-12 shrink-0 items-center gap-1 bg-indigo-950 px-3 text-[13px] text-white">
        <span className="mr-2 font-semibold">Breakpoint</span>
        {BREAKPOINTS.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={b.id === bp.id}
            onClick={() => setBp(b)}
            className={cn(
              "h-8 rounded-full px-3 font-medium transition-colors",
              b.id === bp.id ? "bg-white text-indigo-950" : "text-white/80 hover:bg-white/10"
            )}
          >
            {b.label} <span className="opacity-60">{b.width}</span>
          </button>
        ))}
        <span className="ml-auto opacity-60">
          {bp.width}px{scale < 1 ? ` · ${Math.round(scale * 100)}%` : ""}
        </span>
      </div>
      <div ref={stageRef} className="relative min-h-0 flex-1 overflow-hidden">
        {height > 0 && (
          <iframe
            title="PULSE screen"
            src={src}
            style={{
              width: bp.width,
              height,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              left: `calc(50% - ${bp.width / 2}px)`,
              top: pad,
            }}
            className="absolute rounded-xl border-0 bg-surface-page shadow-xl"
          />
        )}
      </div>
    </div>
  )
}

export { EmbedBridge, ViewportShell }
