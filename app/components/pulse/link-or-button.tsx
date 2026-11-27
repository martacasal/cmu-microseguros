import * as React from "react"
import Link from "next/link"

/** Renders a Next <Link> when `href` is set, otherwise a <button>. Used by PULSE buttons. */
type LinkOrButtonProps = React.ComponentProps<"button"> & { href?: string }

function LinkOrButton({ href, children, className, ...props }: LinkOrButtonProps) {
  if (href && !props.disabled) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={props["aria-label"]}
        data-slot={(props as Record<string, unknown>)["data-slot"] as string | undefined}
      >
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  )
}

export { LinkOrButton, type LinkOrButtonProps }
