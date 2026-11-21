# Happy path: Turn on cover

Figma handoff page: [Open in Figma](https://www.figma.com/design/ZSRSbjS30hv1TNxJiztdG4/PULSE?node-id=209-1326)

## Context

The user switches on pay-per-minute (by 30min slots) sports cover for one session (e.g. football at Parque da Cidade, 1 h 20): picks the activity and duration, sees the quote, pays with MB WAY and is covered until the time they set. Cover can be extended or ended early, and switches off by itself at the end, so they only pay for the time used.

## Flows

| Step | Screen | What the user does | Goes to |
| --- | --- | --- | --- |
| 1 | [[05.1 Turn on]] | Picks the activity (Running, Football, Cycling, Surfing, Hiking or + Other), sets the duration in 15 min steps (− / +, max. 4 h), optionally turns on "Cover my gear", taps **See quote** | 3 (or 2 via "+ Other") |
| 2 | [[05.2 Other activity]] | Searches for or picks another sport from the list (each one shows its risk level) | 1 |
| 3 | [[05.4 Calculating]] | Waits while the 5 steps are checked: activity and level, duration, place, gear, price (about 5 s) | 4 |
| 4 | [[06.1 Quote]] | Reviews the price, the "Why this price" breakdown (time, risk, gear) and what is / isn't covered; taps **Pay and turn on** | 6 (or 5 via "?") |
| 5 | [[06.4 Terms]] | Reads the terms as plain-English FAQs; can open the full document (PDF) | 4 |
| 6 | [[07.1 Pay]] | Picks MB WAY, Card or Apple Pay / Google Pay, enters the MB WAY mobile number, checks the session total; taps **Pay and turn on** | 7 |
| 7 | [[07.2 Waiting for MB WAY]] | Confirms the request in the MB WAY app before the countdown ends (3:45) | 8 |
| 8 | [[07.3 Cover on]] | Sees "You're covered until 19:20" with activity, place, gear and start time | 9 |
| 9 | [[08.1 Active session]] | Follows the countdown and the cost so far; can **Extend** (+15 min, +30 min, +1 h) or **End** (press and hold) | 10, 11 or 13 |
| 10 | [[08.2 Extend]] | Picks the extra time, checks the new end time and extra cost, taps **Confirm** | 9 |
| 11 | [[08.3 End]] | Confirms **Yes, end now** (or **Stay covered** to go back to 9) | 12 |
| 12 | [[09.1 Ended early]] | Sees the receipt: paid, refunded, time used; taps **Done** or **I had a problem** | End |
| 13 | [[09.2 Ended automatically]] | Cover ended at the time set; sees the summary; taps **Done** or **Set up reminders** | End |

## Data overview

- **Activities and risk**: list of sports with their risk level (low, medium, high, not covered yet) and what the risk covers (e.g. "contact, knee and ankle"). Comes from the back end; the "Other activity" list is searchable.
- **Location**: the place of the session (e.g. Parque da Cidade, Porto) is checked in the Calculating step.
- **Quote**: total price and its breakdown (time, risk, gear), what is covered (treatment, disability, gear, up to [AMOUNT]) and not covered (outside your slot, federation events). All prices are still `€X.XX` placeholders.
- **Payment**: MB WAY request with a 3:45 expiry; cover only starts once the payment is approved.
- **Active session**: time left, end time, cost so far and the price cap; extension price is the same per minute.
- **Receipt**: amount paid, amount refunded, time used (e.g. 48 of 80 min); the invoice goes to History.
- If the quote calculation is slow, the Calculating screen shows progress per step ("3 of 5 done · about 5 s"). ==Behaviour when a step fails isn't designed yet.==

## Edge cases and acceptance criteria

- Activity not covered (e.g. Kitesurfing): shown with "Not covered yet" and an × instead of a chevron, so it can't be picked.
- Duration: changes in 15 min steps, never above 4 h; the end time ("until 19:20") updates with it.
- Gear cover is optional and adds to the price ("+ €X.XX · ball and boots").
- The user is only charged when they confirm payment ("You're only charged when you confirm.").
- MB WAY request expires after 3:45; the user can **Cancel request**. Cover doesn't start until the payment is approved.
- Extending the session keeps cover with no gap and the same price per minute.
- Ending early needs press and hold, then a confirmation; the user pays only for the time used and the rest is refunded.
- If the user does nothing, cover ends on its own at the time set, with a reminder 15 min before the end.
- Age and fitness don't affect the price [V].

## Open questions

- All `€X.XX`, `[AMOUNT]` and `[Partner insurer]` values are placeholders: what are the real numbers and the insurer's name?
- Items marked **[V]** need validating: max. 4 h, Apple Pay / Google Pay, "Your age and fitness don't affect the price", cancellation and refunds.
- Frame numbering skips 05.3, 06.2, 06.3 and 06.5+: are those screens missing from this handoff or removed? removed
- What happens on errors: quote calculation fails, MB WAY request expires or is declined, card payment fails?
- Where does "I had a problem" (09.1) lead — the claims flow?
- Is the "Cover my gear" toggle on by default? 
