import type { FlowDef } from "../types"
import S13_1 from "./13-1-help-centre"
import S13_2 from "./13-2-assistant-my-insurance"
import S13_3 from "./13-3-talk-to-a-person"
import S13_4 from "./13-4-chat-with-a-person"
import S13_5 from "./13-5-schedule-a-call"
import S13_6 from "./13-6-chat-ended"

export const flow13: FlowDef = {
  id: "13",
  title: "Centro de ajuda",
  screens: [
    { id: "13-1", name: "13.1 Help centre", node: "254:3805", Component: S13_1 },
    { id: "13-2", name: "13.2 Assistant · my insurance", node: "254:3854", Component: S13_2 },
    { id: "13-3", name: "13.3 Talk to a person", node: "254:3876", Component: S13_3 },
    { id: "13-4", name: "13.4 Chat with a person", node: "254:3899", Component: S13_4 },
    { id: "13-5", name: "13.5 Schedule a call", node: "254:3916", Component: S13_5 },
    { id: "13-6", name: "13.6 Chat ended", node: "254:3941", Component: S13_6 },
  ],
}
