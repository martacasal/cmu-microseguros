import { CheckRow, CtaButton, InfoCard, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 03.4 Insurance you already have · Figma 254:2414 */
export default function InsuranceYouAlreadyHave() {
  return (
    <PhoneScreen
      title="Your insurance"
      left={<RoundButton icon="back" href={href("03-3")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-2.5"
      footer={
        <CtaButton href={href("04-1")} className="text-center">
          Save
        </CtaButton>
      }
    >
      <ScreenTitle muted="have insurance?">Do you already</ScreenTitle>
      <CheckRow label="Health insurance" defaultChecked />
      <CheckRow label="Personal accident or life" />
      <CheckRow label="Bank or card insurance" />
      <CheckRow label="None / not sure" />
      <InfoCard
        variant="brand"
        title="What PULSE adds"
        titleSize={17}
        description="e.g. costs of an accident during the activity. To be confirmed with the insurer [V]."
      />
    </PhoneScreen>
  )
}
