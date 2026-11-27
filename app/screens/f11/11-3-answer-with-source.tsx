"use client"

import { ChatBubble, RoundButton } from "@/components/pulse"
import { href } from "../types"
import { ASSISTANT, ChatScreen, ChipLink, Chips } from "./_parts"

/** 11.3 Answer with source · Figma 254:3465 */
export default function AnswerWithSource() {
  return (
    <ChatScreen
      left={<RoundButton icon="back" href={href("11-2")} aria-label="Back" />}
      title="Assistant"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      placeholder="Type or dictate your message"
    >
      <ChatBubble from="you" who="You">
        If I break my bike, am I covered?
      </ChatBubble>
      <ChatBubble from="assistant" who={ASSISTANT}>
        No. You didn&apos;t add gear cover to this session, so damage to the bike isn&apos;t included. Source: session terms,
        clause [5.1].
      </ChatBubble>
      <Chips>
        <ChipLink href={href("04-3")}>Solved</ChipLink>
        <ChipLink href={href("11-4")}>Talk to a person</ChipLink>
      </Chips>
    </ChatScreen>
  )
}
