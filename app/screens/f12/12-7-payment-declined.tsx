import { href } from "../types"
import { ExceptionScreen } from "./_parts"

/** 12.7 Payment declined · Figma 254:3723 */
export default function PaymentDeclined() {
  return (
    <ExceptionScreen
      back={href("07-1")}
      icon="card"
      tone="danger"
      title="The payment"
      muted="didn't go through"
      body="The MB WAY request expired. You haven't been charged and cover isn't on."
      primary={{ label: "Try again", href: href("07-1") }}
      secondary={{ label: "Use another method", href: href("07-1") }}
      secondaryKind="secondary"
    >
      <div className="flex flex-col gap-1.5 rounded-[28px] bg-surface-brand p-[18px]">
        <p className="text-[11px] leading-[1.32] font-semibold tracking-[0.66px] text-text-inverse-muted">QUOTE SAVED</p>
        <p className="text-[40px] leading-[1.04] font-bold tracking-[-1.2px] text-text-inverse">[N] min</p>
        <p className="text-[14px] leading-[1.32] font-medium text-text-inverse-muted">at the same price</p>
      </div>
    </ExceptionScreen>
  )
}
