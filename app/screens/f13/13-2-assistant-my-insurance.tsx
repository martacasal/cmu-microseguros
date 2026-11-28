"use client"

import { ChatBubble } from "@/components/pulse"
import { href } from "../types"
import { HistoryBackButton } from "./back-button"
import { ASSISTANT, ChatScreen, ChipChoice, ChipLink, Chips } from "../f11/_parts"

/** 13.2 Assistant · my insurance · Figma 254:3854 */
export default function AssistantMyInsurance() {
  return (
    <ChatScreen
      left={<HistoryBackButton fallback={href("13-1")} />}
      title="Assistant"
      gap="gap-3"
      placeholder="Type or dictate your question"
      live
    >
      <ChatBubble from="assistant" who={ASSISTANT}>
        Hi, Rafa. I&apos;m PULSE&apos;s automated assistant, not a person. What&apos;s your question about?
      </ChatBubble>
      <ChipChoice options={["A past session", "Cover and prices", "Invoices", "My details"]} defaultValue="Cover and prices" />
      <ChatBubble from="you" who="You">
        Does my health insurance already cover football?
      </ChatBubble>
      <ChatBubble from="assistant" who={ASSISTANT}>
        It depends on your policy. PULSE pays treatment costs after an accident during the activity, up to [AMOUNT]. Want a
        person to look at your case?
      </ChatBubble>
      <Chips>
        <ChipLink href={href("13-3")}>Talk to a person</ChipLink>
        <ChipLink href={href("04-1")}>Got it</ChipLink>
      </Chips>
    </ChatScreen>
  )
}
