"use client"

import * as React from "react"
import { CtaButton, RoundButton, ScreenTitle, SecondaryButton, TextField } from "@/components/pulse"
import { cn } from "cn"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** 02.1 Sign-up at payment · Figma 254:2281 — quote behind a scrim, sign-up bottom sheet on top. */
export default function SignUpAtPayment() {
  const [open, setOpen] = React.useState(true)
  const [dragY, setDragY] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const start = React.useRef<{ y: number; active: boolean } | null>(null)

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    start.current = { y: e.clientY, active: false }
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const s = start.current
    if (!s) return
    const dy = e.clientY - s.y
    if (!s.active && Math.abs(dy) > 6) {
      s.active = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    if (s.active) setDragY(Math.max(0, dy))
  }
  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    const s = start.current
    start.current = null
    if (!s?.active) return
    setDragging(false)
    if (e.clientY - s.y > 100) setOpen(false)
    setDragY(0)
  }

  return (
    <PhoneScreen
      title="Quote"
      left={<RoundButton icon="back" href={href("01-2")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      footer={
        !open && (
          <CtaButton type="button" onClick={() => setOpen(true)} className="text-center">
            Continue
          </CtaButton>
        )
      }
    >
      <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.06em] text-text-secondary">
        FOOTBALL · 1 H 20 · WITH GEAR
      </p>
      <p className="text-[72px] leading-[1.04] font-bold tracking-[-0.03em]">€X.XX</p>

      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-surface-inverse/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-label="Almost there: who are we covering?"
        aria-hidden={!open}
        inert={!open}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        style={{ transform: open ? `translateY(${dragY}px)` : "translateY(100%)" }}
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 rounded-t-[32px] bg-surface-page px-6 pt-3 pb-[34px]",
          !dragging && "transition-transform duration-300 ease-out"
        )}
      >
        <span className="h-[5px] w-10 rounded-[3px] bg-border-subtle" />
        <ScreenTitle size={28} muted="who are we covering?" className="w-full">
          Almost there:
        </ScreenTitle>
        <p className="w-full text-[15px] leading-[1.32] text-text-secondary">
          We ask this once, to issue the policy. It stays saved.
        </p>
        <SecondaryButton href={href("02-2")}>Continue with Apple</SecondaryButton>
        <SecondaryButton href={href("02-2")}>Continue with Google</SecondaryButton>
        <TextField label="Email" type="email" placeholder="name@email.com" />
        <CtaButton href={href("02-2")} className="text-center">
          Continue with email
        </CtaButton>
        <p className="w-full text-center text-[12px] leading-[1.32] font-medium text-text-secondary">
          By continuing, you accept the Terms and Privacy Policy.
        </p>
      </div>
    </PhoneScreen>
  )
}
