import { CtaButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { BottomSheet, SessionTopBar, SmallTitle, TimerRing } from "./_parts"

/** 08.3 End · Figma 254:3083 — confirm sheet over the active session. */
export default function End() {
  return (
    <PhoneScreen header={false} contentClassName="pt-0">
      <SessionTopBar />
      <TimerRing size={200} stroke={16} progress={0.58} time="48:02" caption="left" timeSize={44} />
      <BottomSheet>
        <SmallTitle inline muted="now?">End</SmallTitle>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">
          Cover ends now. You only pay for the time used: €X.XX instead of €X.XX.
        </p>
        <CtaButton variant="end" href={href("09-1")} className="justify-center text-center">
          Yes, end now
        </CtaButton>
        <TextButton href={href("08-1")}>Stay covered</TextButton>
      </BottomSheet>
    </PhoneScreen>
  )
}
