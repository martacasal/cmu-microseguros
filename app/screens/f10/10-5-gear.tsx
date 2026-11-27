import { CtaButton, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { HeaderTitle, StatCard } from "./_parts"

/** 10.5 Gear · Figma 254:3364 */
export default function Gear() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("10-4")} aria-label="Back" />}
      title={<HeaderTitle>Gear</HeaderTitle>}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      footer={
        <CtaButton href={href("10-6")} className="justify-center text-center">
          Add gear
        </CtaButton>
      }
    >
      <ScreenTitle muted="gear">Your</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">Saved once, covered in 1 tap.</p>
      <div className="flex gap-2">
        <StatCard variant="brand" className="h-[150px]" overline="Bike" value="€X" caption="invoice and 2 photos ✓" />
        <StatCard className="h-[150px]" overline="Surfboard" value="€X" caption="invoice missing" />
      </div>
    </PhoneScreen>
  )
}
