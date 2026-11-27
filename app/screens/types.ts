import type * as React from "react"

export type ScreenDef = {
  /** route id, e.g. "01-1" → /s/01-1 */
  id: string
  /** label as in Figma, e.g. "01.1 Welcome" */
  name: string
  /** Figma node id in file ZSRSbjS30hv1TNxJiztdG4 */
  node: string
  Component: React.ComponentType
}

export type FlowDef = {
  id: string
  title: string
  screens: ScreenDef[]
}

/** Route to a screen by id: href("05-1") → "/s/05-1" */
export const href = (id: string) => `/s/${id}`
