"use client"

import * as React from "react"
import { ChatInput } from "@/components/pulse"

/** ChatInput needs an onSend handler, so the design system shows it from this small client demo. */
export function ChatInputDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col gap-2">
      <ChatInput placeholder="Type or dictate your question" onSend={setLast} />
      <span className="type-caption text-text-secondary">{last ? `Sent: ${last}` : "Type and press Enter or the send button."}</span>
    </div>
  )
}
