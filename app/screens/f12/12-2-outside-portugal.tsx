import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.2 Outside Portugal · Figma 254:3624 */
export default function OutsidePortugal() {
  return (
    <ExceptionScreen
      back={href("04-1")}
      icon="globe"
      tone="danger"
      title="You're outside"
      muted="our coverage area"
      body="For now we only cover activities in Portugal [V]. You can browse, but not turn on cover."
      primary={{ label: "Got it", href: href("04-1") }}
      secondary={{ label: "Try locating again", href: href("05-1") }}
      secondaryKind="secondary"
    />
  )
}
