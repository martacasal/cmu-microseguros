import type { FlowDef } from "../types"
import S11_1 from "./11-1-get-help"
import S11_2 from "./11-2-assistant-start"
import S11_3 from "./11-3-answer-with-source"
import S11_4 from "./11-4-handover-to-a-person"
import S11_5 from "./11-5-accident-questions"
import S11_6 from "./11-6-claim-summary"
import S11_7 from "./11-7-claim-tracking"
import S11_8 from "./11-8-no-one-available"

export const flow11: FlowDef = {
  id: "11",
  title: "Ajuda e assistência",
  screens: [
    { id: "11-1", name: "11.1 Get help", node: "254:3425", Component: S11_1 },
    { id: "11-2", name: "11.2 Assistant · start", node: "254:3450", Component: S11_2 },
    { id: "11-3", name: "11.3 Answer with source", node: "254:3465", Component: S11_3 },
    { id: "11-4", name: "11.4 Handover to a person", node: "254:3481", Component: S11_4 },
    { id: "11-5", name: "11.5 Accident questions", node: "254:3496", Component: S11_5 },
    { id: "11-6", name: "11.6 Claim summary", node: "254:3517", Component: S11_6 },
    { id: "11-7", name: "11.7 Claim tracking", node: "254:3536", Component: S11_7 },
    { id: "11-8", name: "11.8 No one available", node: "254:3585", Component: S11_8 },
  ],
}
