import { CtaButton, DataRow, InfoCard, RoundButton, ScreenTitle, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 09.2 Ended automatically · Figma 254:3177 */
export default function EndedAutomatically() {
  return (
    <PhoneScreen
      title={<span className="font-medium">Receipt</span>}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={
        <>
          <CtaButton variant="end" href={href("04-1")} className="justify-center text-center">
            Done
          </CtaButton>
          <SecondaryButton href={href("03-2")}>Set up reminders</SecondaryButton>
        </>
      }
    >
      <ScreenTitle muted="ended on its own">Your cover</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">
        It reached 19:20, the time you set. You didn&apos;t need to do anything.
      </p>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 py-1.5">
        <DataRow label="Activity" value="Football" />
        <DataRow label="Time covered" value="1 h 20" />
        <DataRow label="Total paid" value="€X.XX" />
      </div>
      <InfoCard
        variant="brand"
        title="Next time"
        description="Want a reminder when you reach your spot? Set it up in 1 minute."
        href={href("03-2")}
      />
    </PhoneScreen>
  )
}
