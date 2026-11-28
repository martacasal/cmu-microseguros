"use client"

import { CtaButton, RoundButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { eur, gearCoveredValue, quote, ZONE } from "@/lib/pricing"
import { useZone } from "@/lib/use-zone"
import { href } from "../types"
import { CoverItem, LocationCard, PriceBars } from "./_parts"

/** 06.1 Quote · Figma 254:2803 */
export default function Quote() {
  const { zone, coords } = useZone()
  const pos = coords ?? { lat: 38.7251, lng: -9.1498 }
  const q = quote({ minutes: 80, sport: "football", gear: ["football"], startHour: 18, zone })
  const share = (n: number) => Math.min(1, n / q.total)
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("05-1")} aria-label="Back" />}
      title="Quote"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <>
          <CtaButton href={href("07-1")} price={eur(q.total)}>
            Pay and turn on
          </CtaButton>
          <p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">
            You&apos;re only charged when you confirm.
          </p>
        </>
      }
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">
        Football · Today, 18:00 to 19:20
      </p>
      <p className="text-[80px] leading-[1.04] font-bold tracking-[-0.03em] text-indigo-500">{eur(q.total)}</p>
      <p className="text-[15px] leading-[1.32] text-text-secondary">for 1h 20. You only pay for what you use.</p>
      <div className="flex gap-2">
        <CoverItem covered title="Covered" className="h-40 flex-1" footer={`Ball up to ${eur(gearCoveredValue("football"))}`}>
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
      <PriceBars
        title="Why this price"
        href={href("06-3")}
        rows={[
          { label: "Time", fill: share(q.time), value: eur(q.time) },
          { label: "Football risk", fill: Math.max(share(q.risk), 0.04), value: eur(q.risk) },
          { label: ZONE[zone].factor > 1 ? `Dark · ${ZONE[zone].label}` : "Dark hours", fill: Math.max(share(q.conditions), 0.04), value: eur(q.conditions) },
          { label: "Gear", fill: Math.max(share(q.gear), 0.04), value: eur(q.gear) },
        ]}
      />
      <LocationCard
        lat={pos.lat}
        lng={pos.lng}
        note={`${ZONE[zone].label} · dark at 18:00. Used to set your price.`}
      />
    </PhoneScreen>
  )
}
