import * as React from "react"
import { cn } from "cn"

/** v2/Bolha · assistant (sand), person (white, navy outline), you (navy, right-aligned). */
function ChatBubble({
  from,
  who,
  children,
  className,
}: {
  from: "assistant" | "person" | "you"
  who?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex w-[300px] max-w-[88%] flex-col gap-1 rounded-[22px] px-4 py-3",
        from === "assistant" && "self-start bg-surface-muted",
        from === "person" && "self-start border-[1.5px] border-indigo-950 bg-surface-card",
        from === "you" && "self-end bg-surface-inverse",
        className
      )}
    >
      {who && (
        <span className={cn("text-[11px] font-semibold", from === "you" ? "text-text-inverse-muted" : "text-text-secondary")}>
          {who}
        </span>
      )}
      <div className={cn("text-[15px] font-normal", from === "you" ? "text-text-inverse" : "text-text-primary")}>
        {children}
      </div>
    </div>
  )
}

export { ChatBubble }
