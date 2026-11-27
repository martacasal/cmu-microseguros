import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.1 Age not eligible · Figma 254:3606 */
export default function AgeNotEligible() {
  return (
    <ExceptionScreen
      back={href("04-1")}
      icon="userx"
      tone="danger"
      title="We can't"
      muted="cover you yet"
      body="For now, cover is for people aged [18] to [XX]. You haven't been charged."
      primary={{ label: "Let me know when it's available", href: href("04-1") }}
      secondary={{ label: "Back", href: href("04-1") }}
    />
  )
}
