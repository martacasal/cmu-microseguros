import type { FlowDef } from "../types"
import History from "./10-1-history"
import EmptyHistory from "./10-2-empty-history"
import SessionDetails from "./10-3-session-details"
import Profile from "./10-4-profile"
import Gear from "./10-5-gear"
import AddGear from "./10-6-add-gear"

export const flow10: FlowDef = {
  id: "10",
  title: "Histórico e Perfil",
  screens: [
    { id: "10-1", name: "10.1 History", node: "254:3198", Component: History },
    { id: "10-2", name: "10.2 Empty history", node: "254:3255", Component: EmptyHistory },
    { id: "10-3", name: "10.3 Session details", node: "254:3269", Component: SessionDetails },
    { id: "10-4", name: "10.4 Profile", node: "254:3296", Component: Profile },
    { id: "10-5", name: "10.5 Gear", node: "254:3364", Component: Gear },
    { id: "10-6", name: "10.6 Add gear", node: "254:3386", Component: AddGear },
  ],
}
