import * as React from "react"
import { cn } from "cn"
import { CtaButton, MaskIcon, RoundButton, SecondaryButton, TextButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"

/** Severity of an exception state: blocking error (danger) or soft warning. */
export type ExceptionTone = "danger" | "warning"

const markTone: Record<ExceptionTone, string> = {
  danger: "bg-surface-danger-subtle text-text-danger",
  warning: "bg-surface-warning text-text-primary",
}

/** 96px round state mark with a 40px Figma icon (ícone de estado). */
export function StateMark({ icon, tone }: { icon: string; tone: ExceptionTone }) {
  return (
    <div className={cn("flex size-24 shrink-0 items-center justify-center rounded-full", markTone[tone])}>
      <MaskIcon src={`/icons/f12/${icon}.svg`} width={40} height={40} />
    </div>
  )
}

/** Two-tone 32px title (título). */
export function StateTitle({ children, muted, size = 32 }: { children: React.ReactNode; muted: React.ReactNode; size?: number }) {
  return (
    <h1 className="leading-[1.04] font-bold" style={{ fontSize: size, letterSpacing: `${-size * 0.03}px` }}>
      <span className="block text-text-primary">{children}</span>
      <span className="block text-text-secondary">{muted}</span>
    </h1>
  )
}

/** Small grey tag (etiqueta) for open questions like "[V] To be confirmed". */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex self-start rounded-2xl bg-surface-muted px-3 py-[7px] text-[12px] leading-[1.32] font-semibold text-text-primary">
      {children}
    </span>
  )
}

type Action = { label: string; href: string }

/**
 * Shared layout for the 12.x exception screens: header (back · PULSE · help), state mark,
 * two-tone title, explanation, optional extra content, and a primary CTA plus a
 * secondary (outlined) or text action pinned to the footer.
 */
export function ExceptionScreen({
  back,
  icon,
  tone,
  title,
  muted,
  body,
  children,
  primary,
  secondary,
  secondaryKind = "text",
}: {
  back: string
  icon: string
  tone: ExceptionTone
  title: React.ReactNode
  muted: React.ReactNode
  body: React.ReactNode
  children?: React.ReactNode
  primary: Action
  secondary: Action
  secondaryKind?: "text" | "secondary"
}) {
  const Secondary = secondaryKind === "secondary" ? SecondaryButton : TextButton
  return (
    <PhoneScreen
      left={<RoundButton icon="back" href={back} aria-label="Back" />}
      title={<span className="font-medium">PULSE</span>}
      right={<RoundButton icon="help" href={href("13-2")} aria-label="Help" />}
      footer={
        <>
          <CtaButton href={primary.href} className="text-center">
            {primary.label}
          </CtaButton>
          <Secondary href={secondary.href}>{secondary.label}</Secondary>
        </>
      }
    >
      <StateMark icon={icon} tone={tone} />
      <StateTitle muted={muted}>{title}</StateTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">{body}</p>
      {children}
    </PhoneScreen>
  )
}
