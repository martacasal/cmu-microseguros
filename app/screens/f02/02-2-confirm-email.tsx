import { CtaButton, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { CodeInput } from "../f01/_parts"

/** 02.2 Confirm email · Figma 254:2302 */
export default function ConfirmEmail() {
  return (
    <PhoneScreen
      title="1 of 3"
      left={<RoundButton icon="back" href={href("02-1")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      footer={
        <CtaButton href={href("02-3")} className="text-center">
          Confirm
        </CtaButton>
      }
    >
      <ScreenTitle muted="your email">Confirm</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">We sent a code to name@email.com.</p>
      <CodeInput nextHref={href("02-3")} />
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">You can paste the code · resend in 0:30</p>
    </PhoneScreen>
  )
}
