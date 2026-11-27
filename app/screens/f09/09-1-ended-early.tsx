import { CtaButton, Icon, InfoCard, RoundButton, ScreenTitle, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 09.1 Ended early · Figma 254:3148 — receipt with paid/refunded bento and coral time-used bar. */
export default function EndedEarly() {
  return (
    <PhoneScreen
      title={<span className="font-medium">Receipt</span>}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={
        <>
          <CtaButton href={href("04-1")} className="justify-center text-center">
            Done
          </CtaButton>
          <TextButton href={href("11-5")}>I had a problem</TextButton>
        </>
      }
    >
      <div className="flex size-24 items-center justify-center rounded-full bg-surface-brand text-text-inverse">
        <Icon name="check" box={44} />
      </div>
      <ScreenTitle size={44} muted="covered!">
        Workout
      </ScreenTitle>
      <div className="flex gap-2">
        <InfoCard variant="brand" className="h-[120px] flex-1" overline="You paid">
          <span className="text-[40px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</span>
        </InfoCard>
        <InfoCard className="h-[120px] flex-1" overline="Refunded">
          <span className="text-[40px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</span>
        </InfoCard>
      </div>
      <div className="flex items-center gap-2.5 rounded-[28px] bg-surface-card px-5 py-[18px]">
        <p className="w-[108px] shrink-0 text-[14px] leading-[1.32] font-medium">Time used</p>
        <div className="relative h-2 flex-1 overflow-hidden rounded-[4px] bg-progress-track">
          <div className="absolute inset-y-0 left-0 rounded-[4px] bg-progress-fill" style={{ width: `${(48 / 80) * 100}%` }} />
        </div>
        <p className="shrink-0 text-[13px] leading-[1.32] font-semibold text-text-secondary">48 of 80 min</p>
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">Your invoice is in History.</p>
    </PhoneScreen>
  )
}
