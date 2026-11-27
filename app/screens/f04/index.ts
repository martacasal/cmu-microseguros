import type { FlowDef } from "../types"
import HomeFirstTime from "./04-1-home-first-time"
import HomeWithSuggestion from "./04-2-home-with-suggestion"
import HomeCovered from "./04-3-home-covered"

export const flow04: FlowDef = {
  id: "04",
  title: "Início",
  screens: [
    { id: "04-1", name: "04.1 Home · first time", node: "254:2434", Component: HomeFirstTime },
    { id: "04-2", name: "04.2 Home · with suggestion", node: "254:2480", Component: HomeWithSuggestion },
    { id: "04-3", name: "04.3 Home · covered", node: "254:2559", Component: HomeCovered },
  ],
}
