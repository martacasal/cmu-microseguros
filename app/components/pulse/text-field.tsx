import * as React from "react"
import { cn } from "cn"
import { Input } from "@/components/ui/input"

/** B2/Input · label + input + helper / error message. */
function TextField({
  label,
  helper,
  error,
  id,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  label: React.ReactNode
  helper?: React.ReactNode
  error?: React.ReactNode
}) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="type-caption text-text-secondary">
        {label}
      </label>
      <Input id={inputId} aria-invalid={error ? true : undefined} {...props} />
      {(error || helper) && (
        <p className={cn("type-caption", error ? "text-text-danger" : "text-text-secondary")}>
          {error ?? helper}
        </p>
      )}
    </div>
  )
}

export { TextField }
