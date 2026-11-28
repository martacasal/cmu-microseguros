import {
  GEAR,
  MIN_MINUTES,
  MIN_SESSION_PRICE,
  RISK_LEVEL_FACTOR,
  SPORT,
  ZONE,
  eur,
  gearFee,
  hourFactor,
  pricePerMinute,
  quote,
  type SportId,
  type ZoneId,
} from "./pricing"

/**
 * Shared data for the public quote pages (/quote, /quote/<sport>/<minutes>, /llms.txt).
 * These pages are plain server-rendered HTML so chat assistants (ChatGPT, Claude) can read
 * prices by fetching the site: they don't run JavaScript or click. All numbers come from
 * lib/pricing.ts.
 */
export const SPORTS = Object.keys(SPORT) as SportId[]
export const DURATIONS = [30, 60, 90, 120, 180, 240] as const

/** Assumptions behind the headline price on every page. */
export const DEFAULT_START_HOUR = 12
export const DEFAULT_ZONE: ZoneId = "urban"

export const TIMES = [
  { label: "Daytime (12:00)", hour: 12 },
  { label: "Dusk or dawn (18:00)", hour: 18 },
  { label: "Night (22:00)", hour: 22 },
] as const

export const ZONES = Object.entries(ZONE).map(([id, z]) => ({ id: id as ZoneId, label: z.label }))

export const quoteUrl = (sport: string, minutes: number) => `/quote/${sport}/${minutes}`

/** "30 min", "1 h", "1 h 30", "4 h" */
export function durationLabel(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`
}

export const isSport = (s: string): s is SportId => SPORTS.includes(s as SportId)
export const isDuration = (n: number) => (DURATIONS as readonly number[]).includes(n)

/** Headline price: default start time and place, no gear. */
export const headline = (sport: SportId, minutes: number) =>
  quote({ minutes, sport, startHour: DEFAULT_START_HOUR, zone: DEFAULT_ZONE })

export { GEAR, MIN_MINUTES, MIN_SESSION_PRICE, RISK_LEVEL_FACTOR, SPORT, ZONE, eur, gearFee, hourFactor, quote }

/** The pricing rules in plain sentences, shared by /quote and /llms.txt. */
export const RULES = [
  `You pay only for the minutes you're covered: about ${eur(pricePerMinute())} a minute before risk.`,
  `Every session is billed for at least ${MIN_MINUTES} minutes and costs at least ${eur(MIN_SESSION_PRICE)}.`,
  `The sport's risk multiplies the price: low risk x${RISK_LEVEL_FACTOR.low}, medium x${RISK_LEVEL_FACTOR.medium}, high x${RISK_LEVEL_FACTOR.high}.`,
  `Starting at dusk or dawn (18:00 to 22:00, or 6:00 to 8:00) costs x${hourFactor(18)}; at night (22:00 to 6:00) x${hourFactor(23)}.`,
  `Place: ${ZONES.map((z) => `${z.label.toLowerCase()} x${ZONE[z.id].factor}`).join(", ")}.`,
  `Gear is optional: covering a football adds ${eur(gearFee("football"))} per session.`,
  "Cover switches off by itself at the end of the session.",
]

export const COVERED = [
  "Treatment after an accident during the activity: appointments and tests.",
  "A lump sum for disability if there are lasting effects.",
  "Gear you choose to cover: damage or theft during the activity.",
]
export const NOT_COVERED = [
  "Anything outside the session's time slot.",
  "Federation events and training.",
  "Clothing and shoes.",
]
