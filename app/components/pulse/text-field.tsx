import * as React from "react"
import { cn } from "cn"
import { Input } from "@/components/ui/input"

/** v2/Input · 13 medium label, 56px white field (radius 20), helper or error below. */
function TextField({
  label,
  helper,
  error,
  id,
  className,
  inputClassName,
  ...props
}: React.ComponentProps<typeof Input> & {
  label: React.ReactNode
  helper?: React.ReactNode
  error?: React.ReactNode
  inputClassName?: string
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <label htmlFor={inputId} className="text-[13px] font-medium text-text-secondary">
        {label}
      </label>
      <Input
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn("h-14 rounded-[20px] px-[18px] text-[16px] placeholder:text-gray-500", inputClassName)}
        {...props}
      />
      {(error || helper) && (
        <p className={cn("text-[12px] font-medium", error ? "text-text-danger" : "text-text-secondary")}>
          {error ?? helper}
        </p>
      )}
    </div>
  )
}

export { TextField }
