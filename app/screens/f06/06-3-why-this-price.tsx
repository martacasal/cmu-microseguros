import { InfoCard, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { PriceBars } from "./_parts"

/** 06.3 Why this price · Figma 254:2876 */
export default function WhyThisPrice() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("06-1")} aria-label="Back" />}
      title="Why this price"
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
    >
      <ScreenTitle muted="this price?">Why</ScreenTitle>
      <PriceBars
        title="It depends on four things"
        rows={[
          { label: "Activity", fill: 0.565 },
          { label: "Duration", fill: 0.71 },
          { label: "Place", fill: 0.235 },
          { label: "Gear", fill: 0.28 },
        ]}
      />
      <InfoCard
        variant="brand"
        title="What doesn't count"
        description="Your age and fitness don't change the price [V]."
      />
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        Explanation generated automatically from the insurer&apos;s rules.
      </p>
    </PhoneScreen>
  )
}
