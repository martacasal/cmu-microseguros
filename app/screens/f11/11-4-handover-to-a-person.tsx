"use client"

import { ChatBubble, RoundButton } from "@/components/pulse"
import { href } from "../types"
import { ChatScreen, Tag } from "./_parts"

/** 11.4 Handover to a person · Figma 254:3481 */
export default function HandoverToAPerson() {
  return (
    <ChatScreen
      left={<RoundButton icon="back" href={href("11-3")} aria-label="Back" />}
      title="Chat"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      placeholder="Type your message"
    >
      <Tag>Handing over to a person · about 5 min</Tag>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        They&apos;ll see what you&apos;ve written. No need to repeat it.
      </p>
      <p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">Rui joined the chat · 10:42</p>
      <ChatBubble from="person" who="Rui · PULSE team · person">
        Hi, I&apos;m Rui from the PULSE team. I&apos;m a person, not the assistant. I&apos;ve read your question about the
        bike.
      </ChatBubble>
    </ChatScreen>
  )
}
