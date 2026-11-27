import type { FlowDef } from "../types"
import Pay from "./07-1-pay"
import WaitingMbWay from "./07-2-waiting-mbway"
import CoverOn from "./07-3-cover-on"

export const flow07: FlowDef = {
  id: "07",
  title: "Pagamento e confirmação",
  screens: [
    { id: "07-1", name: "07.1 Pay", node: "254:2967", Component: Pay },
    { id: "07-2", name: "07.2 Waiting for MB WAY", node: "254:2986", Component: WaitingMbWay },
    { id: "07-3", name: "07.3 Cover on", node: "254:3005", Component: CoverOn },
  ],
}
