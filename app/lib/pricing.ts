/**
 * Pay-per-minute pricing (benchmarks: Zego, Cuvva, Trov — daily rate sliced into minutes,
 * with a minimum charge of 1 hour of cover).
 *
 * pricePerMinute = dailyRate x (1 + margin) / 24 / 60
 * base           = pricePerMinute x max(minutes, MIN_MINUTES)
 * withSport      = base x SPORT_RISK[sport]              (each level is 3x the previous)
 * withConditions = withSport x hourFactor x zoneFactor   (adverse conditions)
 * total          = max(withConditions + sum(fixed gear fee), MIN_SESSION_PRICE)
 */
export const BASE_DAILY_RATE = 15 // EUR per day, risk factor 1 baseline
export const MARGIN = 0.5 // always applied on top of the daily rate
export const MIN_MINUTES = 60
export const MIN_SESSION_PRICE = 2.5 // EUR, floor for any session

export type RiskLevel = "low" | "medium" | "high"
export const RISK_LEVEL_FACTOR: Record<RiskLevel, number> = { low: 1, medium: 3, high: 9 }

/** Risk per sport (placeholders until we have claims data). */
export const SPORT: Record<string, { label: string; risk: RiskLevel }> = {
  running: { label: "Running", risk: "low" },
  padel: { label: "Padel", risk: "low" },
  cycling: { label: "Cycling", risk: "medium" },
  football: { label: "Football", risk: "medium" },
  rugby: { label: "Rugby", risk: "high" },
  skiing: { label: "Skiing", risk: "high" },
}
export type SportId = keyof typeof SPORT

/** Time of day: darkness and early hours raise the risk. Hour is the local start hour (0-23). */
export function hourFactor(hour: number) {
  if (hour >= 22 || hour < 6) return 1.5 // night
  if (hour >= 18 || hour < 8) return 1.25 // dusk, dawn
  return 1
}

/** Geolocation zone, resolved from the user's position (lat/lng) when available. */
export const ZONE = {
  urban: { label: "Urban area", factor: 1 },
  park: { label: "Park / trail", factor: 1.1 },
  remote: { label: "Remote area", factor: 1.3 },
} as const
export type ZoneId = keyof typeof ZONE

/**
 * Covered equipment. Covered value = half the price of a new item (depreciation);
 * fixed fee = 1/10 of the covered value. Clothing, shoes and other wearables are never covered.
 */
export const GEAR_VALUE_SHARE = 0.5
export const GEAR_FEE_SHARE = 0.1
export const GEAR: Record<string, { label: string; newPrice: number }> = {
  football: { label: "Football", newPrice: 12 }, // EUR, Kipsta F500 size 5 (Decathlon PT, Nov 2026)
}
export type GearId = keyof typeof GEAR

export const gearCoveredValue = (id: GearId) => GEAR[id].newPrice * GEAR_VALUE_SHARE
export const gearFee = (id: GearId) => gearCoveredValue(id) * GEAR_FEE_SHARE

export const pricePerMinute = (dailyRate = BASE_DAILY_RATE) => (dailyRate * (1 + MARGIN)) / 24 / 60

export type Quote = {
  minutes: number
  billedMinutes: number
  perMinute: number
  /** time + risk + conditions + gear + minTopUp = total (before rounding) */
  time: number
  risk: number
  conditions: number
  gear: number
  minTopUp: number
  total: number
}

export function quote({
  minutes,
  sport = "football",
  gear = [],
  startHour = 12,
  zone = "urban",
  dailyRate = BASE_DAILY_RATE,
}: {
  minutes: number
  sport?: SportId
  gear?: GearId[]
  startHour?: number
  zone?: ZoneId
  dailyRate?: number
}): Quote {
  const billedMinutes = Math.max(minutes, MIN_MINUTES)
  const perMinute = pricePerMinute(dailyRate)
  const time = perMinute * billedMinutes
  const withSport = time * RISK_LEVEL_FACTOR[SPORT[sport].risk]
  const withConditions = withSport * hourFactor(startHour) * ZONE[zone].factor
  const gearTotal = gear.reduce((sum, id) => sum + gearFee(id), 0)
  const subtotal = withConditions + gearTotal
  const total = Math.max(subtotal, MIN_SESSION_PRICE)
  return {
    minutes,
    billedMinutes,
    perMinute,
    time,
    risk: withSport - time,
    conditions: withConditions - withSport,
    gear: gearTotal,
    minTopUp: total - subtotal,
    total,
  }
}

export const eur = (n: number) => `€${n.toFixed(2)}`
