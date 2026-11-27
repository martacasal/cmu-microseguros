import {
  BarChart,
  CtaButton,
  ScreenTitle,
  LinkOrButton,
  TextButton,
} from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 01.1 Welcome · Figma 254:2145 — wireframe black → navy inverse surface, white bars → indigo. */
export default function Welcome() {
  return (
    <PhoneScreen
      tone="accent"
      header={false}
      contentClassName="pt-[52px]"
      footer={
        <>
          <CtaButton variant="inverse" href={href("01-2")}>
            See how much it costs
          </CtaButton>
          <TextButton
            href={href("01-3")}
            className="text-text-inverse hover:bg-surface-inverse-raised"
          >
            I already have an account
          </TextButton>
          <LinkOrButton
            href={href("06-4")}
            className="w-full text-center text-[13px] leading-[1.32] text-text-inverse-muted underline underline-offset-2"
          >
            This insurance is guaranteed by Allianz. Read all
          </LinkOrButton>
        </>
      }
    >
      <span className="w-fit rounded-2xl bg-surface-card px-3 py-[7px] text-[12px] font-semibold text-text-primary">
        COVER ON DEMAND
      </span>
      <ScreenTitle size={52} tone="inverse" muted="when you train.">
        Insurance only
      </ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-inverse-muted">
        Turn it on before you train, off when you&apos;re done. Pay only for the
        time you use.
      </p>
      <BarChart
        tone="accent"
        scroll
        bars={[
          23, 23, 70, 70, 70, 23, 23, 23, 86, 86, 23, 23, 55, 55, 23, 86, 86,
          55, 23, 70, 70, 23, 23, 55,
        ]}
        active={[2, 3, 4, 8, 9, 14, 15, 20, 21, 22]}
      />
    </PhoneScreen>
  )
}
