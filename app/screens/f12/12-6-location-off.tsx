import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.6 Location off · Figma 254:3706 */
export default function LocationOff() {
  return (
    <ExceptionScreen
      back={href("05-1")}
      icon="pinoff"
      tone="warning"
      title="We need your"
      muted="location"
      body="It's how we confirm where you train. We only use it while you're covered."
      primary={{ label: "Open settings", href: href("05-1") }}
      secondary={{ label: "Choose place manually", href: href("05-1") }}
      secondaryKind="secondary"
    />
  )
}
