import { BarChart, BottomNav, InfoCard, MaskIcon, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const carouselCard = "h-[162px] w-[220px] shrink-0 snap-start rounded-[26px] py-4"

/** 04.2 Home · with suggestion · Figma 254:2480 */
export default function HomeWithSuggestion() {
  return (
    <PhoneScreen
      left={<RoundButton icon="user" href={href("10-4")} aria-label="Profile" />}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      nav={<BottomNav tab="home" />}
      contentClassName="gap-3"
    >
      <ScreenTitle eyebrow="Hi, Rafa" muted="this month" className="gap-3">
        3h 40 covered
      </ScreenTitle>
      <div className="relative">
        <BarChart
          height={110}
          bars={[32.6, 48.9, 26.1, 59.7, 38, 52.1, 21.7, 45.6, 65.1, 34.7, 56.5, 71.7, 47.8, 76]}
          active={[11, 12, 13]}
        />
        <span className="absolute top-0 right-0 rounded-[14px] bg-surface-card px-3 py-1.5 text-[12px] leading-[1.32] font-semibold text-text-primary">
          Today · 2 h
        </span>
      </div>
      <div className="flex gap-2">
        <InfoCard
          variant="brand"
          className="h-[168px] flex-1"
          overline="Suggestion"
          title="Football"
          titleSize={20}
          description="as usual?"
          footer="1h 20 · up to €X.XX"
          href={href("05-1")}
        />
        <InfoCard className="h-[168px] flex-1" title="3 of 4" titleSize={20} description="active weeks">
          <MaskIcon src="/icons/f04/weeks-dots.svg" width={131} height={70} box={131} className="h-[70px] text-text-primary" />
        </InfoCard>
      </div>
      <p className="text-[16px] leading-[1.3] font-semibold">For you</p>
      <div className="-mx-6 flex snap-x scroll-px-6 gap-2.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none]">
        <InfoCard variant="brand" className={carouselCard} overline="Football · News" title="Warm-ups that help prevent ankle sprains" titleSize={17} footer="4 min read" />
        <InfoCard className={carouselCard} overline="Your cover" title="What to do if you get hurt" titleSize={17} footer="Quick guide" href={href("11-1")} />
        <InfoCard variant="muted" className={carouselCard} overline="Motivation" title="3 weeks in a row. Going for 4?" titleSize={17} footer="Keep it up" />
        <InfoCard className={carouselCard} overline="Surfing · News" title="Swell coming to Ericeira this weekend" titleSize={17} footer="2 min read" />
      </div>
    </PhoneScreen>
  )
}
