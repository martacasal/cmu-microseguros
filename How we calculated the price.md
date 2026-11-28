# How we calculated the price

Living record of the PULSE pricing logic. Update the **Current version** and add a line to the **Changelog** whenever something changes.

- Code: `app/lib/pricing.ts`
- Used by: `06.1 Quote` (`app/screens/f06/06-1-quote.tsx`). Other screens still show placeholder amounts.

## Current version (v2)

Pay per minute. The daily rate is sliced into minutes, with a fixed margin, a sport risk factor, an adverse-conditions factor and a minimum price per session.

```
pricePerMinute = dailyRate x (1 + margin) / 24 / 60
base           = pricePerMinute x max(minutes, minimumMinutes)
withSport      = base x sportRisk
withConditions = withSport x hourFactor x zoneFactor
total          = max(withConditions + sum(fixed gear fee), minimumSessionPrice)
```

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| `dailyRate` | EUR 15.00 / day | Risk factor 1 baseline (range considered: EUR 10 to 20). |
| `margin` | 50% | Always applied when converting the daily rate to hours/minutes. |
| `minimumMinutes` | 60 | Minimum charge of 1 hour of cover. |
| `minimumSessionPrice` | EUR 2.50 | Floor for any session. |
| Sport risk | low 1 / medium 3 / high 9 (each level is 3x the previous) | **Placeholder.** Running, padel = low. Cycling, football = medium. Rugby, skiing = high. |
| Hour factor (local start hour) | 08:00 to 18:00 = 1.0 / 06:00 to 08:00 and 18:00 to 22:00 = 1.25 / 22:00 to 06:00 = 1.5 | Darkness and early hours. |
| Zone factor (geolocation) | urban 1.0 / park or trail 1.1 / remote 1.3 | Resolved in the browser (`app/lib/use-zone.ts`): geolocation, then OpenStreetMap reverse geocoding (leisure/natural = park, no built-up address = remote). Falls back to urban if denied. |
| Gear covered value | 50% of the price of a new item | Football: new ball EUR 12 (Decathlon PT, Kipsta F500 size 5) gives EUR 6.00 covered. |
| Gear fee | 10% of the covered value, fixed | Football: EUR 0.60 per session, independent of duration. |

Equipment rules: clothing, shoes (sneakers) and other wearables are **never covered**. Items live in the `GEAR` table in `app/lib/pricing.ts`.

Derived: `pricePerMinute` = 15 x 1.5 / 24 / 60 = **EUR 0.015625** (EUR 0.9375 per hour).

### "Why this price" breakdown

- **Time** = pricePerMinute x billedMinutes
- **Sport risk** = time x (sportRisk - 1)
- **Conditions** = withSport x (hourFactor x zoneFactor - 1)
- **Gear** = fixed fee of each covered item (not affected by duration, risk or conditions).

Amounts are shown rounded to cents, so displayed rows can differ from the total by 1 cent.

### Worked examples (football, with ball)

| Case | Time | Sport risk | Conditions | Gear | Total |
| --- | --- | --- | --- | --- | --- |
| 80 min, 18:00, park (the Quote screen) | 1.25 | 2.50 | 1.41 | 0.60 | **5.76** |
| 80 min, 14:00, urban | 1.25 | 2.50 | 0.00 | 0.60 | **4.35** |
| 60 min, 23:00, remote | 0.94 | 1.88 | 2.17 | 0.60 | **5.59** |

## Benchmarks

- **Zego** (UK, pay-as-you-go delivery insurance): charged per minute, minimum 1 hour of cover, even if the shift is shorter.
- **Cuvva / Trov**: start from a daily rate and slice it into short periods.

## Decisions and rationale

1. Margin of 50% is non-negotiable and always applied on the daily rate.
2. Minute-based pricing, with a 1 hour minimum, following Zego.
3. EUR 3.00/day was far too low. v2 uses EUR 15.00/day (user range EUR 10 to 20) plus a EUR 2.50 minimum per session.
4. Risk depends on the sport, and rises with adverse conditions (night/dusk, remote location).
5. Gear is a fixed fee: covered value = 50% of a new item, fee = 10% of that. Clothing, shoes and wearables are always excluded.

## Open questions / ideas to improve

- [ ] Validate the base daily rate against real claim costs (expected loss per hour of activity).
- [ ] Replace the placeholder sport risks and condition factors with claims data.
- [ ] Use real geolocation (lat/lng to zone), sunset time and weather instead of fixed hour bands.
- [ ] Football reference price: Decathlon PT, Kipsta F500 size 5 EUR 12 (F100 EUR 8.90, replica balls about EUR 23). Add the other covered equipment to `GEAR`.
- [ ] Should the margin apply before or after the risk/gear factors? Today it is inside `pricePerMinute`, so it scales with them.
- [ ] Extend sessions (08.2): bill extra time per minute, or round up to blocks?
- [ ] Early end (09.1): refund unused minutes, but keep the 60 min minimum?
- [ ] Wire the remaining screens (05.1, 07.1, 08.x) to `lib/pricing.ts`.
- [ ] Taxes and fees (IPS/stamp duty), payment fees.

## Changelog

| Date | Version | Change |
| --- | --- | --- |
| 2026-11-28 | v1 | First version: EUR 3.00/day, 50% margin, per-minute, 60 min minimum, placeholder risk factors, gear as x1.1. |
| 2026-11-28 | v1.1 | Gear is now a fixed fee: 10% of the covered value (50% of a new item). Football EUR 25 new, EUR 12.50 covered, EUR 1.25 fee. Clothing, shoes and wearables excluded. |
| 2026-11-28 | v1.2 | Football new price set from Decathlon PT: EUR 12 (was a EUR 25 estimate). Covered EUR 6.00, fee EUR 0.60. |
| 2026-11-28 | v1.3 | Risk factors now triple per level: low 1, medium 3, high 9 (were 0.8 / 1 / 1.5). |
| 2026-11-28 | v2 | Base EUR 15/day, EUR 2.50 minimum per session, risk per sport (3x per level), adverse-conditions factor from hour of day and geolocation zone. |
| 2026-11-28 | v2 (UI) | Quote shows a low-detail vector map card (MapLibre + OpenFreeMap, no labels) to justify the location-based factor; Covered / Not covered cards moved under the price. |
