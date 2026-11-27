import { href } from "../types"
import { ExceptionScreen, Tag } from "./_parts"

/** 12.10 Health condition · Figma 254:3784 */
export default function HealthCondition() {
  return (
    <ExceptionScreen
      back={href("05-3")}
      icon="pulse"
      tone="warning"
      title="Let's look"
      muted="at this together"
      body="Some health conditions may need a review before cover. Talk to our team, it's quick and confidential."
      primary={{ label: "Talk to the team", href: href("11-1") }}
      secondary={{ label: "Back", href: href("05-3") }}
    >
      <Tag>[V] To be confirmed (X11)</Tag>
    </ExceptionScreen>
  )
}
