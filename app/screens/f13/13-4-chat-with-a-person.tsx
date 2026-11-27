"use client"

import { ChatBubble, RoundButton } from "@/components/pulse"
import { href } from "../types"
import { ChatScreen, Tag } from "../f11/_parts"

/** 13.4 Chat with a person · Figma 254:3899 */
export default function ChatWithAPerson() {
  return (
    <ChatScreen
      left={<RoundButton icon="back" href={href("13-3")} aria-label="Back" />}
      title="Chat"
      gap="gap-3"
      placeholder="Type your message"
      nextHref={href("13-6")}
    >
      <Tag>Inês joined the chat · 14:32</Tag>
      <p className="text-[12px] leading-[1.32] font-medium text-text-secondary">
        She can see your chat and recent sessions. No need to repeat yourself.
      </p>
      <ChatBubble from="person" who="Inês · PULSE team · person">
        Hi, Rafa! I&apos;m Inês from the PULSE team. I saw your question about health insurance.
      </ChatBubble>
      <ChatBubble from="you" who="You">
        If I get hurt playing, which one do I use first?
      </ChatBubble>
      <ChatBubble from="person" who="Inês · PULSE team · person">
        You can use both. I&apos;ll email you a summary of what each one pays in your case [V].
      </ChatBubble>
    </ChatScreen>
  )
}
