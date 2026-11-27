import { DataRow, InfoCard, RoundButton, ScreenTitle, SecondaryButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { HeaderTitle, StatCard } from "./_parts"

/** 10.3 Session details · Figma 254:3269 */
export default function SessionDetails() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("10-1")} aria-label="Back" />}
      title={<HeaderTitle>Session</HeaderTitle>}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <>
          <SecondaryButton>Download invoice (PDF)</SecondaryButton>
          <TextButton href={href("11-5")}>I had a problem in this session</TextButton>
        </>
      }
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary">TODAY, 18:00 TO 18:48</p>
      <ScreenTitle size={32} muted="Parque da Cidade">
        Football
      </ScreenTitle>
      <div className="flex gap-2">
        <StatCard variant="brand" overline="Paid" value="€X.XX" />
        <StatCard overline="Refunded" value="€X.XX" />
      </div>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 py-1.5">
        <DataRow label="Time covered" value="48 min" />
        <DataRow label="Gear" value="Yes" />
      </div>
      <InfoCard variant="muted" title="Cover" titleSize={17} description="Treatment, permanent disability, gear." href={href("06-2")} />
    </PhoneScreen>
  )
}
