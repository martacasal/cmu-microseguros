import { CtaButton, MaskIcon, RoundButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { StateTitle } from "./_parts"

/** 12.9 Extension failed · Figma 254:3762 */
export default function ExtensionFailed() {
  return (
    <PhoneScreen header={false} contentClassName="pt-0">
      {/* active session behind the sheet (08.1) */}
      <div className="-mt-1.5 flex h-14 shrink-0 items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-[20px] bg-surface-info px-3.5 py-[9px] text-[14px] leading-[1.32] font-semibold text-text-primary">
          <MaskIcon src="/icons/f12/dot.svg" width={10} height={10} className="text-status-covered" />
          Covered
        </span>
        <RoundButton variant="sos" href={href("11-1")} aria-label="SOS">
          SOS
        </RoundButton>
      </div>
      <div className="relative mx-auto mt-[14px] size-[200px] shrink-0">
        <MaskIcon src="/icons/f12/ring-track.svg" width={200} height={200} className="absolute inset-0 text-progress-track" />
        <div className="absolute top-0 left-[100px] flex h-[30.4245px] w-[58.7785px] items-center justify-center text-progress-fill">
          <MaskIcon src="/icons/f12/ring-arc.svg" width={58.7785} height={30.4245} />
        </div>
        <p className="absolute inset-x-0 top-[67px] text-center text-[44px] leading-[1.04] font-bold tracking-[-1.32px] text-text-primary">08:12</p>
        <p className="absolute inset-x-0 top-[117px] text-center text-[12px] leading-[1.32] font-medium text-text-secondary">left</p>
      </div>

      {/* fundo escurecido + bottom sheet */}
      <div aria-hidden className="absolute inset-0 bg-surface-inverse/50" />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="ext-failed-title"
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 rounded-t-[32px] bg-surface-page px-6 pt-3 pb-[34px] md:inset-x-auto md:bottom-8 md:left-1/2 md:w-[calc(100%-4rem)] md:max-w-[560px] md:-translate-x-1/2 md:rounded-[32px] md:px-8 md:pb-8 md:shadow-xl"
      >
        <div className="h-[5px] w-10 rounded-[3px] bg-border-subtle" />
        <div id="ext-failed-title" className="w-full">
          <StateTitle size={28} muted="extend">
            We couldn&apos;t
          </StateTitle>
        </div>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">
          The extra payment failed. Your cover continues until 19:20.
        </p>
        <CtaButton href={href("08-1")} className="text-center">
          Try again
        </CtaButton>
        <TextButton href={href("08-1")}>Close</TextButton>
      </div>
    </PhoneScreen>
  )
}
