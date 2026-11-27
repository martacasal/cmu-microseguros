import { CtaButton, MaskIcon, RoundButton, SecondaryButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { TwoTone } from "./_parts"

/** 11.1 Get help · Figma 254:3425 */
export default function GetHelp() {
  return (
    <PhoneScreen header={false} contentClassName="pt-0">
      {/* screen behind the sheet: active cover with time ring */}
      <div className="-mx-6 flex h-[64px] items-center justify-between px-6 pb-[6px]">
        <span className="inline-flex items-center gap-2 rounded-[20px] bg-surface-card px-3.5 py-[9px] text-[14px] leading-[1.32] font-semibold">
          <span className="size-2.5 rounded-full bg-status-covered" />
          Covered
        </span>
        <RoundButton variant="sos" href={href("11-1")} aria-label="SOS">
          SOS
        </RoundButton>
      </div>
      <div className="relative h-[200px] w-full">
        <div className="absolute top-0 left-1/2 size-[200px] -translate-x-1/2">
          <MaskIcon src="/icons/f11/ring-track.svg" width={200} height={200} className="absolute inset-0 text-surface-muted" />
          <MaskIcon src="/icons/f11/ring-arc.svg" width={180.902} height={200} box={200} className="absolute inset-0 justify-end text-progress-fill" />
        </div>
        <p className="absolute inset-x-0 top-[67px] text-center text-[44px] leading-[1.04] font-bold tracking-[-0.03em]">52:14</p>
        <p className="absolute inset-x-0 top-[117px] text-center text-[12px] leading-[1.32] font-medium text-text-secondary">left</p>
      </div>

      {/* dimmed backdrop + bottom sheet */}
      <div aria-hidden className="absolute inset-0 z-10 bg-surface-inverse/50" />
      <div
        role="dialog"
        aria-label="Get help"
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 rounded-t-[32px] bg-surface-page px-6 pt-3 pb-[34px] md:inset-x-auto md:bottom-8 md:left-1/2 md:w-[calc(100%-4rem)] md:max-w-[560px] md:-translate-x-1/2 md:rounded-[32px] md:px-8 md:pb-8 md:shadow-xl"
      >
        <span className="h-[5px] w-10 rounded-[3px] bg-border-subtle" />
        <div className="w-full">
          <TwoTone size={32} muted="help">
            Get
          </TwoTone>
        </div>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">Your cover stays on.</p>
        <CtaButton variant="danger" className="text-center">
          Call 112 · emergency
        </CtaButton>
        <p className="w-full text-[12px] leading-[1.32] font-medium text-text-secondary">
          Serious injury or immediate danger. Works without mobile data.
        </p>
        <SecondaryButton href={href("11-8")}>Call the 24h line</SecondaryButton>
        <SecondaryButton href={href("11-2")}>Chat with the assistant</SecondaryButton>
        <TextButton href={href("04-3")}>Close</TextButton>
      </div>
    </PhoneScreen>
  )
}
