import type { FlowDef } from "../types"
import Location from "./03-1-location"
import SpotReminder from "./03-2-spot-reminder"
import EmergencyContact from "./03-3-emergency-contact"
import InsuranceYouAlreadyHave from "./03-4-insurance-you-already-have"

export const flow03: FlowDef = {
  id: "03",
  title: "Configuração opcional",
  screens: [
    { id: "03-1", name: "03.1 Location", node: "254:2359", Component: Location },
    { id: "03-2", name: "03.2 Spot reminder", node: "254:2376", Component: SpotReminder },
    { id: "03-3", name: "03.3 Emergency contact", node: "254:2393", Component: EmergencyContact },
    { id: "03-4", name: "03.4 Insurance you already have", node: "254:2414", Component: InsuranceYouAlreadyHave },
  ],
}
