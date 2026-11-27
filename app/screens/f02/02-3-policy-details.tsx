import { CtaButton, RoundButton, ScreenTitle, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 02.3 Policy details · Figma 254:2323 */
export default function PolicyDetails() {
  return (
    <PhoneScreen
      title="2 of 3"
      left={<RoundButton icon="back" href={href("02-2")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <CtaButton href={href("02-4")} className="text-center">
          Continue
        </CtaButton>
      }
    >
      <ScreenTitle muted="details">Policy</ScreenTitle>
      <TextField label="Full name" autoComplete="name" placeholder="As on your ID" />
      <TextField label="Date of birth" inputMode="numeric" placeholder="DD/MM/YYYY" />
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        Confirms we can cover you. It doesn&apos;t change the price.
      </p>
      <TextField label="Mobile" type="tel" autoComplete="tel" placeholder="+351 9XX XXX XXX" />
      <span className="w-fit rounded-2xl bg-surface-muted px-3 py-[7px] text-[12px] leading-[1.32] font-semibold">
        [V] Tax ID and address depend on the insurer
      </span>
    </PhoneScreen>
  )
}
