import type { FlowDef } from "../types"
import AgeNotEligible from "./12-1-age-not-eligible"
import OutsidePortugal from "./12-2-outside-portugal"
import ActivityNotCovered from "./12-3-activity-not-covered"
import FederationMember from "./12-4-federation-member"
import DeclinedDueToConditions from "./12-5-declined-due-to-conditions"
import LocationOff from "./12-6-location-off"
import PaymentDeclined from "./12-7-payment-declined"
import PricingError from "./12-8-pricing-error"
import ExtensionFailed from "./12-9-extension-failed"
import HealthCondition from "./12-10-health-condition"

export const flow12: FlowDef = {
  id: "12",
  title: "Estados de exceção",
  screens: [
    { id: "12-1", name: "12.1 Age not eligible", node: "254:3606", Component: AgeNotEligible },
    { id: "12-2", name: "12.2 Outside Portugal", node: "254:3624", Component: OutsidePortugal },
    { id: "12-3", name: "12.3 Activity not covered", node: "254:3642", Component: ActivityNotCovered },
    { id: "12-4", name: "12.4 Federation member", node: "254:3665", Component: FederationMember },
    { id: "12-5", name: "12.5 Declined due to conditions", node: "254:3686", Component: DeclinedDueToConditions },
    { id: "12-6", name: "12.6 Location off", node: "254:3706", Component: LocationOff },
    { id: "12-7", name: "12.7 Payment declined", node: "254:3723", Component: PaymentDeclined },
    { id: "12-8", name: "12.8 Pricing error", node: "254:3745", Component: PricingError },
    { id: "12-9", name: "12.9 Extension failed", node: "254:3762", Component: ExtensionFailed },
    { id: "12-10", name: "12.10 Health condition", node: "254:3784", Component: HealthCondition },
  ],
}
