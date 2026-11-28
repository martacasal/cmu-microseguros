import { RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { HeaderTitle, List, ListItem, StatCard } from "./_parts"

/** 10.4 Profile · Figma 254:3296 */
export default function Profile() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("04-1")} aria-label="Back" />}
      title={<HeaderTitle>Profile</HeaderTitle>}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
    >
      <ScreenTitle inline muted="Costa">Rafa</ScreenTitle>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">Member since 2026 · Porto</p>
      <div className="flex gap-2">
        <StatCard variant="brand" value="28 h" caption="covered this year" />
        <StatCard value="23" caption="sessions yet" />
      </div>
      <List>
        <ListItem icon="user20" title="Personal details" sub="Name, birth date, contact" />
        <ListItem icon="bike" title="Gear" sub="2 saved" href={href("10-5")} />
        <ListItem icon="heart" title="Emergency and insurance" sub="Marta · health insurance" href={href("03-3")} />
        <ListItem icon="bell" title="Reminders and devices" sub="Parque da Cidade · watch [H]" href={href("03-2")} />
        <ListItem icon="file" title="Terms and documents" sub="Terms, privacy" href={href("06-4")} last />
      </List>
    </PhoneScreen>
  )
}
