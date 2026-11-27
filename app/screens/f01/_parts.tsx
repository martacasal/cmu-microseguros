"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"

/**
 * 6-digit code boxes (01.4 Access code, 02.2 Confirm email): white 60px cells, radius 18,
 * the next empty cell outlined. One transparent input on top takes typing and paste.
 */
export function CodeInput({
  defaultValue = "",
  length = 6,
  nextHref,
}: {
  defaultValue?: string
  length?: number
  /** Route to open automatically once all digits are entered. */
  nextHref?: string
}) {
  const router = useRouter()
  const [value, setValue] = React.useState(defaultValue)
  const [focused, setFocused] = React.useState(true)
  const active = Math.min(value.length, length - 1)
  return (
    <div className="relative flex w-full gap-2">
      {Array.from({ length }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex h-[60px] min-w-0 flex-1 items-center justify-center rounded-[18px] bg-surface-card text-[24px] leading-[1.04] font-bold tracking-[-0.03em] text-text-primary",
            focused && i === active && "border-[1.5px] border-surface-inverse"
          )}
        >
          {value[i] ?? ""}
        </div>
      ))}
      <input
        aria-label="Code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          const next = e.target.value.replace(/\D/g, "").slice(0, length)
          setValue(next)
          if (nextHref && next.length === length) router.push(nextHref)
        }}
        className="absolute inset-0 cursor-text opacity-0"
      />
    </div>
  )
}
