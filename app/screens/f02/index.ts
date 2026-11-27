import type { FlowDef } from "../types"
import SignUpAtPayment from "./02-1-sign-up-at-payment"
import ConfirmEmail from "./02-2-confirm-email"
import PolicyDetails from "./02-3-policy-details"
import Consents from "./02-4-consents"

export const flow02: FlowDef = {
  id: "02",
  title: "Identificação",
  screens: [
    { id: "02-1", name: "02.1 Sign-up at payment", node: "254:2281", Component: SignUpAtPayment },
    { id: "02-2", name: "02.2 Confirm email", node: "254:2302", Component: ConfirmEmail },
    { id: "02-3", name: "02.3 Policy details", node: "254:2323", Component: PolicyDetails },
    { id: "02-4", name: "02.4 Consents", node: "254:2341", Component: Consents },
  ],
}
