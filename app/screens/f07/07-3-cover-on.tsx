import { CtaButton, MaskIcon, RoundButton, ScreenTitle, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

const ROWS = [
  ["Activity", "Football"],
  ["Place", "Parque da Cidade"],
  ["Gear", "Covered"],
  ["Started", "18:00"],
]

/** 07.3 Cover on · Figma 254:3005 */
export default function CoverOn() {
  return (
    <PhoneScreen
      tone="inverse"
      left={<RoundButton variant="inverse" icon="close" href={href("04-3")} aria-label="Close" />}
      right={<RoundButton variant="inverse" icon="help" href={href("11-1")} aria-label="Help" />}
      footer={
        <>
          <CtaButton variant="inverse" href={href("08-1")}>
            View session
          </CtaButton>
          <TextButton href={href("10-4")} className="text-text-inverse hover:bg-surface-inverse-raised">
            Add emergency contact
          </TextButton>
        </>
      }
    >
      <span className="flex size-24 items-center justify-center rounded-full bg-surface-info text-surface-brand">
        <MaskIcon src="/icons/f07/check-big.svg" width={44} height={44} box={44} />
      </span>
      <ScreenTitle size={42} tone="inverse" muted="until 19:20">
        You&apos;re covered
      </ScreenTitle>
      <div className="flex flex-col rounded-[28px] bg-surface-inverse-raised px-5 py-1.5 text-[15px]">
        {ROWS.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between border-b border-text-inverse/10 py-[13px]">
            <span className="text-text-inverse-muted">{label}</span>
            <span className="font-semibold text-text-inverse">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-inverse-muted">
        We&apos;ll remind you 15 min before the end. It switches off by itself.
      </p>
    </PhoneScreen>
  )
}
