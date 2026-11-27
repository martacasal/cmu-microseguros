"use client"

import { ChatBubble, RoundButton } from "@/components/pulse"
import { href } from "../types"
import { ASSISTANT, ChatScreen, ChipLink, Chips } from "./_parts"

/** 11.2 Assistant · start · Figma 254:3450 */
export default function AssistantStart() {
  return (
    <ChatScreen
      left={<RoundButton icon="back" href={href("11-1")} aria-label="Back" />}
      title="Assistant"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      placeholder="Type or dictate your message"
    >
      <ChatBubble from="assistant" who={ASSISTANT}>
        Hi, I&apos;m PULSE&apos;s automated assistant. I&apos;m a program, not a person. I can answer questions or help if
        something happened.
      </ChatBubble>
      <Chips>
        <ChipLink href={href("11-3")}>Question about my cover</ChipLink>
        <ChipLink href={href("11-5")}>Something happened</ChipLink>
        <ChipLink href={href("11-4")}>Talk to a person</ChipLink>
      </Chips>
    </ChatScreen>
  )
}
