import { headers } from "next/headers"

import { EmbedBridge, ViewportShell } from "@/components/dev/viewport-shell"

/**
 * Screens open inside a viewport shell (breakpoint selector outside the page). The shell loads the same
 * URL in an iframe, which gets the bare screen: browsers send `Sec-Fetch-Dest: iframe` for it.
 */
export default async function ScreensLayout({ children }: LayoutProps<"/s">) {
  const dest = (await headers()).get("sec-fetch-dest")
  if (dest === "iframe") {
    return (
      <>
        <EmbedBridge />
        {children}
      </>
    )
  }
  return <ViewportShell />
}
