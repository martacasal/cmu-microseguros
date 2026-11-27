import { CtaButton, RoundButton, ScreenTitle, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { ImagePlaceholder } from "./_parts"

/** 03.2 Spot reminder · Figma 254:2376 */
export default function SpotReminder() {
  return (
    <PhoneScreen
      title="Reminders"
      left={<RoundButton icon="back" href={href("03-1")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={
        <>
          <CtaButton href={href("03-3")} className="text-center">
            Turn on reminders
          </CtaButton>
          <TextButton href={href("03-3")}>Not now</TextButton>
        </>
      }
    >
      <ImagePlaceholder label="notification when you reach your spot" />
      <ScreenTitle muted="when you arrive?">A reminder</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">
        When you reach your usual spot, we&apos;ll ask if you want to turn it on. You always decide.
      </p>
    </PhoneScreen>
  )
}
