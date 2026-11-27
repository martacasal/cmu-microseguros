import type { FlowDef } from "../types"
import EndedEarly from "./09-1-ended-early"
import EndedAutomatically from "./09-2-ended-automatically"

export const flow09: FlowDef = {
  id: "09",
  title: "Fim da sessão",
  screens: [
    { id: "09-1", name: "09.1 Ended early", node: "254:3148", Component: EndedEarly },
    { id: "09-2", name: "09.2 Ended automatically", node: "254:3177", Component: EndedAutomatically },
  ],
}
