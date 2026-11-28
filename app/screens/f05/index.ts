import type { FlowDef } from "../types"
import TurnOn from "./05-1-turn-on"
import OtherActivity from "./05-2-other-activity"
import Calculating from "./05-4-calculating"

export const flow05: FlowDef = {
  id: "05",
  title: "Ativar",
  screens: [
    { id: "05-1", name: "05.1 Turn on", node: "254:2583", Component: TurnOn },
    { id: "05-2", name: "05.2 Other activity", node: "254:2657", Component: OtherActivity },
    { id: "05-4", name: "05.4 Calculating", node: "254:2732", Component: Calculating },
  ],
}
