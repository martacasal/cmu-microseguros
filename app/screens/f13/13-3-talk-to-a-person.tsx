import Link from "next/link"
import { CtaButton, RoundButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { TwoTone } from "../f11/_parts"

/** 13.3 Talk to a person · Figma 254:3876 */
export default function TalkToAPerson() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("13-2")} aria-label="Back" />}
      title="Talk to a person"
      contentClassName="gap-2.5"
      footer={
        <CtaButton href={href("13-4")} className="text-center">
          Continue in chat
        </CtaButton>
      }
    >
      <TwoTone muted="like to talk?">How would you</TwoTone>
      <Link
        href={href("13-4")}
        className="flex flex-col gap-1.5 rounded-[28px] bg-surface-brand p-[18px] leading-[1.32] text-text-inverse transition-opacity hover:opacity-90"
      >
        <span className="text-[11px] font-semibold tracking-[0.06em] text-text-inverse-muted">CHAT</span>
        <span className="text-[20px] font-semibold">Now</span>
        <span className="text-[14px] font-medium text-text-inverse-muted">
          Estimated wait: about 4 min. They&apos;ll see your chat.
        </span>
      </Link>
      <Link
        href={href("13-5")}
        className="flex flex-col gap-1.5 rounded-[28px] bg-surface-card p-[18px] leading-[1.32] transition-colors hover:bg-surface-subtle"
      >
        <span className="text-[11px] font-semibold tracking-[0.06em] text-text-secondary">CALL</span>
        <span className="text-[20px] font-semibold">We&apos;ll call you</span>
        <span className="text-[14px] font-medium text-text-secondary">Pick a time that suits you.</span>
      </Link>
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-muted p-[18px] leading-[1.32]">
        <span className="text-[11px] font-semibold tracking-[0.06em] text-text-secondary">EMAIL</span>
        <span className="text-[20px] font-semibold">Written reply</span>
        <span className="text-[14px] font-medium text-text-secondary">Within [24 h] on weekdays [V].</span>
      </div>
    </PhoneScreen>
  )
}
