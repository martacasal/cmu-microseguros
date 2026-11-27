import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.4 Federation member · Figma 254:3665 */
export default function FederationMember() {
  return (
    <ExceptionScreen
      back={href("05-3")}
      icon="shieldx"
      tone="warning"
      title="We can't cover"
      muted="you for football"
      body="Federation athletes already have mandatory sports insurance by law (DL 10/2009). You haven't been charged."
      primary={{ label: "Choose another activity", href: href("05-3") }}
      secondary={{ label: "My mistake, I don't compete", href: href("06-1") }}
    >
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-muted p-[18px] leading-[1.32]">
        <p className="text-[17px] font-semibold text-text-primary">What you can do</p>
        <p className="text-[14px] font-medium text-text-secondary">
          Check with your federation what&apos;s covered outside training and events, or cover another activity.
        </p>
      </div>
    </ExceptionScreen>
  )
}
