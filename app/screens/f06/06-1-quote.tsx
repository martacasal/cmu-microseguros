import { RoundButton, SlideToTurnOn } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { CoverItem, PriceBars } from "./_parts"

/** 06.1 Quote · Figma 254:2803 */
export default function Quote() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("05-1")} aria-label="Back" />}
      title="Quote"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <>
          <SlideToTurnOn label="Slide to pay and turn on" price="€X.XX" href={href("07-1")} className="h-16" />
          <p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">
            You&apos;re only charged when you confirm.
          </p>
        </>
      }
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">
        Football · Today, 18:00 to 19:20
      </p>
      <p className="text-[80px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</p>
      <p className="text-[15px] leading-[1.32] text-text-secondary">for 1h 20. You only pay for what you use.</p>
      <PriceBars
        title="Why this price"
        href={href("06-3")}
        rows={[
          { label: "Time", fill: 0.71 },
          { label: "Medium risk", fill: 0.52 },
          { label: "Gear", fill: 0.28 },
        ]}
      />
      <div className="flex gap-2">
        <CoverItem covered title="Covered" className="h-40 flex-1" footer="up to [AMOUNT]">
          Tratamento
          <br />
          Invalidez
          <br />
          Equipamento
        </CoverItem>
        <CoverItem covered={false} title="Not covered" className="h-40 flex-1" footer="See all ›" href={href("06-2")}>
          Outside your slot
          <br />
          Federation events
        </CoverItem>
      </div>
    </PhoneScreen>
  )
}
