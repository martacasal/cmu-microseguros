import type { FlowDef } from "../types"
import Quote from "./06-1-quote"
import WhatsCovered from "./06-2-whats-covered"
import WhyThisPrice from "./06-3-why-this-price"
import Terms from "./06-4-terms"

export const flow06: FlowDef = {
  id: "06",
  title: "Proposta e detalhes",
  screens: [
    { id: "06-1", name: "06.1 Quote", node: "254:2803", Component: Quote },
    { id: "06-2", name: "06.2 What's covered and not", node: "254:2844", Component: WhatsCovered },
    { id: "06-3", name: "06.3 Why this price", node: "254:2876", Component: WhyThisPrice },
    { id: "06-4", name: "06.4 Terms", node: "254:2912", Component: Terms },
  ],
}
