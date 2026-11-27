import { CtaButton, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { CodeInput } from "./_parts"

/** 01.4 Access code · Figma 254:2257 */
export default function AccessCode() {
  return (
    <PhoneScreen
      title="Log in"
      left={<RoundButton icon="back" href={href("01-3")} aria-label="Back" />}
      footer={
        <CtaButton href={href("04-1")} className="text-center">
          Log in
        </CtaButton>
      }
    >
      <ScreenTitle muted="your email">Confirm</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">We sent a 6-digit code to name@email.com.</p>
      <CodeInput defaultValue="472" />
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">You can paste the code · resend in 0:30</p>
    </PhoneScreen>
  )
}
