import { CtaButton, RoundButton, ScreenTitle, SecondaryButton, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 02.1 Sign-up at payment · Figma 254:2281 — quote behind a scrim, sign-up bottom sheet on top. */
export default function SignUpAtPayment() {
  return (
    <PhoneScreen
      title="Quote"
      left={<RoundButton icon="back" href={href("01-2")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary">
        FOOTBALL · 1 H 20 · WITH GEAR
      </p>
      <p className="text-[72px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</p>

      <div aria-hidden className="absolute inset-0 bg-surface-inverse/50" />
      <div
        role="dialog"
        aria-label="Almost there: who are we covering?"
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 rounded-t-[32px] bg-surface-page px-6 pt-3 pb-[34px]"
      >
        <span className="h-[5px] w-10 rounded-[3px] bg-border-subtle" />
        <ScreenTitle size={28} muted="who are we covering?" className="w-full">
          Almost there:
        </ScreenTitle>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">
          We ask this once, to issue the policy. It stays saved.
        </p>
        <SecondaryButton href={href("02-2")}>Continue with Apple</SecondaryButton>
        <SecondaryButton href={href("02-2")}>Continue with Google</SecondaryButton>
        <TextField label="Email" type="email" placeholder="name@email.com" />
        <CtaButton href={href("02-2")} className="text-center">
          Continue with email
        </CtaButton>
        <p className="w-full text-center text-[12px] leading-[1.32] font-medium text-text-secondary">
          By continuing, you accept the Terms and Privacy Policy.
        </p>
      </div>
    </PhoneScreen>
  )
}
