import { BottomNav, InfoCard, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 04.1 Home · first time · Figma 254:2434 */
export default function HomeFirstTime() {
  return (
    <PhoneScreen
      left={<RoundButton icon="user" href={href("10-4")} aria-label="Profile" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      nav={<BottomNav tab="home" />}
    >
      <ScreenTitle eyebrow="Hi, Rafa" muted="yet">
        Not covered
      </ScreenTitle>
      <div className="flex gap-2">
        <InfoCard
          variant="brand"
          className="h-40 flex-1"
          overline="Step 1"
          title="Pick"
          titleSize={20}
          description="activity and time, see the price first"
          href={href("05-1")}
        />
        <InfoCard
          className="h-40 flex-1"
          overline="Step 2"
          title="Turn on"
          titleSize={20}
          description="billed by the minute, switches off by itself"
        />
      </div>
      <InfoCard
        variant="muted"
        overline="Step 3"
        title="If you need it, ask for help"
        description="112 first, then a person from our team."
        href={href("11-1")}
      />
      <p className="text-[16px] font-semibold">For you</p>
      <div className="-mx-6 flex snap-x scroll-px-6 gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none]">
        <InfoCard variant="brand" className="h-[165px] w-[220px] shrink-0 snap-start rounded-[26px] py-4" overline="Getting started" title="How PULSE works in 30 seconds" titleSize={17} footer="Watch · 0:30" />
        <InfoCard className="h-[165px] w-[220px] shrink-0 snap-start rounded-[26px] py-4" overline="Your cover" title="What’s covered, in plain English" titleSize={17} footer="Quick guide" href={href("06-2")} />
        <InfoCard variant="muted" className="h-[165px] w-[220px] shrink-0 snap-start rounded-[26px] py-4" overline="Motivation" title="First session? Start small, start today." titleSize={17} footer="Tip" />
        <InfoCard className="h-[165px] w-[220px] shrink-0 snap-start rounded-[26px] py-4" overline="Running · News" title="Sunday runs along the Douro" titleSize={17} footer="Porto · 2 min read" />
      </div>
    </PhoneScreen>
  )
}
