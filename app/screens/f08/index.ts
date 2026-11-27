import type { FlowDef } from "../types"
import ActiveSession from "./08-1-active-session"
import Extend from "./08-2-extend"
import End from "./08-3-end"
import LockScreen from "./08-4-lock-screen"
import Watch from "./08-5-watch"

export const flow08: FlowDef = {
  id: "08",
  title: "Durante a sessão",
  screens: [
    { id: "08-1", name: "08.1 Active session", node: "254:3027", Component: ActiveSession },
    { id: "08-2", name: "08.2 Extend", node: "254:3054", Component: Extend },
    { id: "08-3", name: "08.3 End", node: "254:3083", Component: End },
    { id: "08-4", name: "08.4 Lock screen", node: "254:3105", Component: LockScreen },
    { id: "08-5", name: "08.5 Watch", node: "254:3129", Component: Watch },
  ],
}
