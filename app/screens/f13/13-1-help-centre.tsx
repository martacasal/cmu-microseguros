import Link from "next/link"
import { MaskIcon, RoundButton, TextField } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { TwoTone } from "../f11/_parts"

const FAQ = [
  "How does per-minute cover work?",
  "How do I get my invoice?",
  "Does my health insurance already cover me?",
  "Can I cancel a session?",
]

/** 13.1 Help centre · Figma 254:3805 */
export default function HelpCentre() {
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={href("04-1")} aria-label="Back" />}
      title="Help"
      contentClassName="gap-3"
      footer={<p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">In an emergency, call 112.</p>}
    >
      <TwoTone muted="help?">How can we</TwoTone>
      <TextField label="Search" placeholder="e.g. invoice, cover, cancel" type="search" />
      <div className="flex gap-2">
        <Link
          href={href("13-2")}
          className="flex h-[178px] min-w-0 flex-1 flex-col gap-2 rounded-[28px] bg-surface-brand p-[18px] leading-[1.32] text-text-inverse transition-opacity hover:opacity-90"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-surface-card text-text-primary">
            <MaskIcon src="/icons/f13/chat.svg" width={20} height={20} />
          </span>
          <span className="text-[20px] font-semibold">Assistant</span>
          <span className="text-[14px] font-medium text-text-inverse-muted">instant answers, any time</span>
          <span className="text-[12px] font-medium text-text-inverse-muted">Start chat ›</span>
        </Link>
        <Link
          href={href("13-3")}
          className="flex h-[178px] min-w-0 flex-1 flex-col gap-2 rounded-[28px] bg-surface-card p-[18px] leading-[1.32] transition-colors hover:bg-surface-subtle"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-surface-muted">
            <MaskIcon src="/icons/f13/headset.svg" width={20} height={20} />
          </span>
          <span className="text-[20px] font-semibold">A person</span>
          <span className="text-[14px] font-medium text-text-secondary">chat, call or email</span>
          <span className="text-[12px] font-medium text-text-secondary">weekdays, [hours] [V]</span>
        </Link>
      </div>
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary uppercase">Frequent questions</p>
      <div className="flex flex-col rounded-[28px] bg-surface-card px-4 py-1">
        {FAQ.map((q, i) => (
          <Link
            key={q}
            href={href("13-2")}
            className={
              "flex items-center gap-3 py-[13px] text-[15px] leading-[1.32] font-semibold" +
              (i < FAQ.length - 1 ? " border-b border-border-subtle" : "")
            }
          >
            <span className="flex-1">{q}</span>
            <MaskIcon src="/icons/f13/chevron.svg" width={18} height={18} />
          </Link>
        ))}
      </div>
    </PhoneScreen>
  )
}
