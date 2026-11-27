"use client"

import { ChatBubble, RoundButton, TextButton } from "@/components/pulse"
import { href } from "../types"
import { ASSISTANT, ChatScreen, ChipChoice, Tag } from "./_parts"

/** 11.5 Accident questions · Figma 254:3496 */
export default function AccidentQuestions() {
  return (
    <ChatScreen
      left={<RoundButton icon="back" href={href("11-2")} aria-label="Back" />}
      title="Assistant"
      right={<RoundButton variant="sos" href={href("11-1")} aria-label="SOS">SOS</RoundButton>}
      gap="gap-2.5"
      above={<TextButton href={href("11-4")}>Skip and talk to a person now</TextButton>}
      composerLabel="Answer"
      placeholder="Type or dictate your answer"
      nextHref={href("11-6")}
    >
      <ChatBubble from="assistant" who={ASSISTANT}>
        I&apos;ll ask you 4 quick questions. It takes about 2 minutes. You can skip any of them.
      </ChatBubble>
      <Tag variant="muted">1 of 4</Tag>
      <ChatBubble from="assistant" who={ASSISTANT}>
        You were playing football at Parque da Cidade today. Is that right?
      </ChatBubble>
      <ChipChoice options={["Yes", "No"]} defaultValue="Yes" />
      <ChatBubble from="you" who="You">
        I fell and hit my knee on the ground.
      </ChatBubble>
    </ChatScreen>
  )
}
