import { CtaButton, DataRow, RoundButton, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { TwoTone } from "./_parts"

/** 11.6 Claim summary · Figma 254:3517 */
export default function ClaimSummary() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("11-5")} aria-label="Back" />}
      title="Assistant"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      footer={
        <>
          <CtaButton href={href("11-7")} className="text-center">
            Confirm and send
          </CtaButton>
          <SecondaryButton href={href("11-5")}>Edit</SecondaryButton>
        </>
      }
    >
      <TwoTone size={30} muted="to the team. OK?">
        I&apos;ll pass this
      </TwoTone>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 py-1.5">
        <DataRow label="Session" value="Football · today 18:00" />
        <DataRow label="What happened" value="Fall, knee" />
        <DataRow label="Emergency care" value="Not needed" />
        <DataRow label="Doctor" value="Not yet" />
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        You can send photos and documents later. Nothing is sent without your OK.
      </p>
    </PhoneScreen>
  )
}
