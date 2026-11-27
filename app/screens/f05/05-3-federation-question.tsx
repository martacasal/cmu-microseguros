import { CtaButton, RoundButton, ScreenTitle, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 05.3 Federation question · Figma 254:2716 */
export default function FederationQuestion() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("05-1")} aria-label="Back" />}
      title="Turn on"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={
        <>
          <CtaButton href={href("05-4")} className="text-center">
            I don&apos;t compete
          </CtaButton>
          <SecondaryButton href={href("12-4")}>Yes, I compete</SecondaryButton>
        </>
      }
    >
      <ScreenTitle muted="in a federation?">Do you play football</ScreenTitle>
      <div className="rounded-[28px] bg-surface-muted p-[18px] text-[14px] leading-[1.32] font-medium">
        If so, you already have mandatory sports insurance for it by law (DL 10/2009), so football isn&apos;t covered here.
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">We save your answer for this activity only.</p>
    </PhoneScreen>
  )
}
