import { CtaButton, MaskIcon, RoundButton, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { TwoTone } from "./_parts"

/** 11.8 No one available · Figma 254:3585 */
export default function NoOneAvailable() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("11-7")} aria-label="Back" />}
      title="Chat"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      footer={
        <>
          <CtaButton href={href("04-1")} className="text-center">
            Call me in the next 15 min
          </CtaButton>
          <SecondaryButton>Call the 24h line now</SecondaryButton>
        </>
      }
    >
      <span className="flex size-24 items-center justify-center rounded-full bg-surface-inverse text-text-inverse">
        <MaskIcon src="/icons/f11/clock.svg" width={40} height={40} />
      </span>
      <TwoTone size={32} muted="on chat right now">
        No one free
      </TwoTone>
      <p className="text-[15px] leading-[1.32] text-text-secondary">Your request is logged (no. [REF]).</p>
      <div className="rounded-[28px] bg-surface-muted p-[18px] text-[14px] leading-[1.32] font-medium">
        Current wait on the 24h line: [N] min. If it&apos;s serious, call 112.
      </div>
    </PhoneScreen>
  )
}
