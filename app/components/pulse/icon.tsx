import * as React from "react"
import { cn } from "cn"

/**
 * PULSE v2 icons (Figma 254:1995). The SVGs in /public/icons are used untouched as
 * CSS masks so they take `currentColor` (the design system colour of the parent).
 * Sizes are the SVGs' root width/height, centred in the Figma icon box.
 */
const ICONS = {
  back: [13.6667, 12],
  close: [12, 12],
  help: [17, 17],
  user: [14.5, 15.75],
  home: [15.9848, 15.9848],
  plus: [16.3367, 16.3367],
  history: [15.9849, 16.0006],
  shield: [18.1567, 21.4067],
  "shield-x": [18.1567, 21.4067],
  check: [11.9333, 8.93333],
} as const

export type IconName = keyof typeof ICONS

/** Box size per icon in Figma (20px, except plus/shield in the nav at 26 and check at 16). */
function Icon({
  name,
  box = 20,
  className,
}: {
  name: IconName
  box?: number
  className?: string
}) {
  const [w, h] = ICONS[name]
  const scale = box / 20
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: box, height: box }}
    >
      <span
        className="block bg-current"
        style={{
          width: w * scale,
          height: h * scale,
          maskImage: `url(/icons/${name}.svg)`,
          WebkitMaskImage: `url(/icons/${name}.svg)`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </span>
  )
}

/**
 * Any single-colour Figma SVG (downloaded to /public) rendered as a mask in currentColor.
 * Pass the SVG root width/height unchanged; `box` is the Figma icon frame size.
 */
function MaskIcon({
  src,
  width,
  height,
  box,
  className,
}: {
  src: string
  width: number
  height: number
  box?: number
  className?: string
}) {
  const size = box ?? Math.max(width, height)
  return (
    <span aria-hidden className={cn("inline-flex shrink-0 items-center justify-center", className)} style={{ width: size, height: size }}>
      <span
        className="block bg-current"
        style={{
          width,
          height,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </span>
  )
}

export { Icon, MaskIcon }
