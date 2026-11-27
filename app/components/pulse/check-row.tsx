"use client"

import * as React from "react"
import { cn } from "cn"
import { Icon } from "./icon"

/** v2/Check · white row with a 26px round check box (consents, lists). */
function CheckRow({
  label,
  description,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  className,
}: {
  label: React.ReactNode
  description?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (v: boolean) => void
  className?: string
}) {
  const [inner, setInner] = React.useState(defaultChecked)
  const checked = checkedProp ?? inner
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => {
        setInner(!checked)
        onCheckedChange?.(!checked)
      }}
      className={cn(
        "flex w-full items-center gap-3 rounded-[20px] bg-surface-card px-4 py-3.5 text-left outline-none transition-colors hover:bg-surface-subtle focus-visible:ring-3 focus-visible:ring-ring/40",
        className
      )}
    >
      <span
        className={cn(
          "flex size-[26px] shrink-0 items-center justify-center rounded-full",
          checked ? "bg-control-on text-white" : "border-2 border-border-subtle"
        )}
      >
        {checked && <Icon name="check" box={16} />}
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px] text-text-primary">{label}</span>
        {description && <span className="text-[13px] font-medium text-text-secondary">{description}</span>}
      </span>
    </button>
  )
}

export { CheckRow }
