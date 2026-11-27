import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.8 Pricing error · Figma 254:3745 */
export default function PricingError() {
  return (
    <ExceptionScreen
      back={href("05-1")}
      icon="refresh"
      tone="danger"
      title="We couldn't"
      muted="calculate the price"
      body="Check your connection and try again. You haven't been charged."
      primary={{ label: "Try again", href: href("05-1") }}
      secondary={{ label: "Back", href: href("05-1") }}
    />
  )
}
