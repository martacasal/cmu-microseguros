import { href } from "../types"
import { ExceptionScreen, Tag } from "./_parts"

/** 12.5 Declined due to conditions · Figma 254:3686 */
export default function DeclinedDueToConditions() {
  return (
    <ExceptionScreen
      back={href("04-1")}
      icon="cloud"
      tone="danger"
      title="We can't cover"
      muted="this session today"
      body="Forecast conditions at this spot (e.g. sea warning) are outside the insurer's limits. You haven't been charged."
      primary={{ label: "Back to home", href: href("04-1") }}
      secondary={{ label: "Choose another time", href: href("05-1") }}
    >
      <Tag>[V] Rule to be confirmed (X4)</Tag>
    </ExceptionScreen>
  )
}
