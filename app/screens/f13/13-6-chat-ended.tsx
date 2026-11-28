import { CtaButton, RoundButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { ChipChoice, TwoTone } from "../f11/_parts"

/** 13.6 Chat ended · Figma 254:3941 */
export default function ChatEnded() {
  return (
    <PhoneScreen
      left={<RoundButton icon="close" href={href("04-1")} aria-label="Close" />}
      title="Chat"
      contentClassName="gap-3"
      footer={
        <>
          <CtaButton variant="end" href={href("04-1")} className="text-center">
            Back to home
          </CtaButton>
          <TextButton href={href("13-2")}>Start a new chat</TextButton>
        </>
      }
    >
      <TwoTone inline muted="ended">Chat</TwoTone>
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-card p-[18px] leading-[1.32]">
        <span className="text-[18px] font-semibold">Summary</span>
        <span className="text-[14px] font-medium text-text-secondary">
          You can use PULSE and your health insurance. Inês sent the details to your email.
        </span>
      </div>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">Saved in History, under Claims.</p>
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">Did this help?</p>
      <ChipChoice options={["Solved", "Kind of", "Didn't solve it"]} />
    </PhoneScreen>
  )
}
