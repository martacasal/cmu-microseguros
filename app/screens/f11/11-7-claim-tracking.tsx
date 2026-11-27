import { cn } from "cn"
import { CtaButton, Icon, RoundButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { Tag, TwoTone } from "./_parts"

type State = "done" | "now" | "next"

function TimelineStep({ state, label, meta }: { state: State; label: string; meta?: string }) {
  return (
    <div className="flex items-center gap-3 py-[11px]">
      <span
        className={cn(
          "flex size-[26px] shrink-0 items-center justify-center rounded-full",
          state === "done" && "bg-surface-inverse text-text-inverse",
          state === "now" && "border-2 border-surface-inverse",
          state === "next" && "bg-surface-muted"
        )}
      >
        {state === "done" && <Icon name="check" box={16} />}
        {state === "now" && <span className="size-2.5 rounded-full bg-surface-inverse" />}
      </span>
      <span
        className={cn(
          "flex-1 text-[15px] leading-[1.32]",
          state === "now" && "font-semibold",
          state === "next" && "text-text-secondary"
        )}
      >
        {label}
      </span>
      {meta && <span className="text-[13px] leading-[1.32] font-semibold whitespace-nowrap text-text-secondary">{meta}</span>}
    </div>
  )
}

/** 11.7 Claim tracking · Figma 254:3536 */
export default function ClaimTracking() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("11-6")} aria-label="Back" />}
      title="Claim no. [REF]"
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      contentClassName="gap-3"
      footer={
        <>
          <CtaButton href={href("11-8")} className="text-center">
            Send medical report
          </CtaButton>
          <TextButton href={href("11-4")}>Talk to Ana</TextButton>
        </>
      }
    >
      <Tag variant="warning">Action needed</Tag>
      <TwoTone size={32} muted="football, 8 Nov">
        Knee
      </TwoTone>
      <div className="flex items-center gap-3 rounded-[28px] bg-surface-card px-4 py-[18px]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-muted">
          <Icon name="user" />
        </span>
        <span className="flex flex-1 flex-col gap-0.5 leading-[1.32]">
          <span className="text-[15px] font-semibold">Ana · PULSE team</span>
          <span className="text-[13px] text-text-secondary">Handling your claim</span>
        </span>
      </div>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-5 py-2.5">
        <TimelineStep state="done" label="Claim received" />
        <TimelineStep state="done" label="Under review" />
        <TimelineStep state="now" label="Send medical report" meta="Now" />
        <TimelineStep state="next" label="Decision" meta="deadline [V]" />
        <TimelineStep state="next" label="Payment" meta="deadline [V]" />
      </div>
    </PhoneScreen>
  )
}
