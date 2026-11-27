import type { FlowDef } from "../types"
import Welcome from "./01-1-welcome"
import PriceSimulator from "./01-2-price-simulator"
import LogIn from "./01-3-log-in"
import AccessCode from "./01-4-access-code"

export const flow01: FlowDef = {
  id: "01",
  title: "Entrada e simulador",
  screens: [
    { id: "01-1", name: "01.1 Welcome", node: "254:2145", Component: Welcome },
    { id: "01-2", name: "01.2 Price simulator", node: "254:2175", Component: PriceSimulator },
    { id: "01-3", name: "01.3 Log in", node: "254:2242", Component: LogIn },
    { id: "01-4", name: "01.4 Access code", node: "254:2257", Component: AccessCode },
  ],
}
