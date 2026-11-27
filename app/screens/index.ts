import { flow01 } from "./f01"
import { flow02 } from "./f02"
import { flow03 } from "./f03"
import { flow04 } from "./f04"
import { flow05 } from "./f05"
import { flow06 } from "./f06"
import { flow07 } from "./f07"
import { flow08 } from "./f08"
import { flow09 } from "./f09"
import { flow10 } from "./f10"
import { flow11 } from "./f11"
import { flow12 } from "./f12"
import { flow13 } from "./f13"
import type { FlowDef, ScreenDef } from "./types"

export const flows: FlowDef[] = [flow01, flow02, flow03, flow04, flow05, flow06, flow07, flow08, flow09, flow10, flow11, flow12, flow13]

export const screens: ScreenDef[] = flows.flatMap((f) => f.screens)

export function getScreen(id: string) {
  return screens.find((s) => s.id === id)
}

export { href } from "./types"
