> [!info] Who fills what
> - **The group**: §1 Project Context, §2 Competitors, every **SWOT** in §3 and §4 Key Lessons.
> - **AI**: only the three bullets of each competitor in §3 (interaction loop, UI patterns, friction). Leave every SWOT block empty: the group fills it.

## 1. Project Context

- **Market / Area**: Insurance
- **Target Users**: Amateur Athletes
- **Target Platform**: Web / Mobile / Desktop / Smartwatches
- **One-Liner Project Summary**: Turn on insurance only for the duration of a single activity, in a few taps: pick the activity and how long it lasts, choose whether to cover equipment, see the price and why, and be covered until the activity ends.

---

## 2. Competitors (4)

### Direct Competitors

1. **Fidelidade Multicare**: Portugal's Fidelidade health insurance brand (plans Multicare 1, 2 and 3), sold as an annual contract, with the Multicare Vitality app that rewards physical activity.
2. **Mapfre Acidentes Free Time**: Mapfre Spain's temporary accident insurance for leisure and amateur sport, bought only for the days you need (1 to 14 days); valid in Spain, Andorra and the French Pyrenees, not in Portugal.

### Indirect / Analogous Solutions

3. **Via Verde Estacionar**: Portuguese on-street parking payment by phone, where the user starts a session, can end it early and pays only for the minutes used (since June 2026 it lives inside the main Via Verde app).
4. **Revolut**: Banking app whose travel insurance is switched on in a couple of taps and billed per day, with geolocation turning cover on abroad and off at home (Pay-per-Day).

---

## 3. Deep-Dive Audit

### Competitor 1: Fidelidade Multicare

- **Primary Interaction Loop**: The user simulates a plan online (for themselves or the family), customises the plan and payment frequency, enters personal data for every insured person, submits the request and waits to be contacted to finish the contract. Once insured, cover runs all year; the separate Multicare Vitality app tracks steps and workouts (smartwatch or Apple Health) and turns weekly goals into FidCoins for partner vouchers.
- **Key UI Patterns & Mechanics**: Multi-step quote simulator, tiered plan comparison (Multicare 1, 2, 3), long personal-data forms, a hand-off to a human to close the sale, and in Vitality a gamified dashboard with weekly goals, points and a rewards store.
- **Friction & Cognitive Load Points**: The product is annual and broad (hospital, outpatient, dental), so someone who only wants cover for a run or a game in the park pays for a lot they do not need. Buying is not instant (the user has to wait for contact). Plan tiers, limits and exclusions are dense, and sports injuries are not addressed directly on the product page. App Store reviews of Vitality report activities and points that do not sync, repeated logins and a slow, unintuitive interface.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: Renowned Insurance Company
- **Weaknesses**: annual and broad, Buying is not instant, Plan tiers, limits and exclusions are dense, ports injuries are not addressed directly on the product page, repeated logins and a slow, unintuitive interface
- **Opportunities**: Be digital and young
- **Threats**: User find insurance companies difficult to understand

### Competitor 2: Mapfre Acidentes Free Time

- **Primary Interaction Loop**: The user opens the product page, goes to the "Calcula tu precio" price calculator, picks the days of cover (minimum 1, maximum 14), gets a price, contracts and pays online. Cover is for accidents during leisure and amateur sport (death, injury indemnity, medical expenses up to 1,500 euros, assistance) and ends on its own, with no renewal.
- **Key UI Patterns & Mechanics**: Classic insurer web funnel: product landing page with cover list and FAQs, then a separate price calculator form, then checkout. Duration chosen in whole days.
- **Friction & Cognitive Load Points**: The smallest unit is a full day, so a one-hour activity is still bought as a day. The quote lives on a separate site from the product page, and the user has to read cover limits and accepted activities before trusting it. There is no "in activity" state (no timer, no stop or extend). Only valid in Spain, Andorra and the French Pyrenees, so it does not serve users in Portugal.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: Renowned Insurance Company
- **Weaknesses**: smallest unit is a full day, no hour option; The quote lives on a separate site from the product page; Difficult and unintuitive start
- **Opportunities**: Smaller time slots
- **Threats**: It's not in Portugal or other parts of Europe

### Competitor 3: Via Verde Estacionar

- **Primary Interaction Loop**: The user logs in with their Via Verde account, chooses the vehicle (one or more plates) and the parking time, and starts the session. The cost is charged to the Via Verde account (no prepaid balance or card to add). When back at the car, the user taps "Terminar" to end early, and the app recalculates the fee per minute so they pay only for the time used.
- **Key UI Patterns & Mechanics**: Start / running session / end session state machine, a duration picker at the start, an active session with an early stop button, per-minute billing and payment that runs in the background through the existing account.
- **Friction & Cognitive Load Points**: Users tend to overestimate the time and rarely use the early-stop function (4gnews calls it a function "almost nobody uses"), so they overpay. The standalone app was discontinued in June 2026 and moved into the main Via Verde app, forcing users to migrate. Coverage depends on the municipality, so users have to know whether their street is supported.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: Easy and intuitive to use
- **Weaknesses**: Users tend to overestimate the time, so they overpay; Coverage depends on the municipality
- **Opportunities**: More coverage
- **Threats**: 

### Competitor 4: Revolut

- **Primary Interaction Loop**: Inside the banking app the user turns on travel insurance in a couple of taps. With Pay-per-Day, geolocation detects when the user is abroad and starts cover automatically, then switches it off when they come home; the user pays only for the days abroad (under 1 GBP a day at launch, against a 30 GBP annual alternative), charged to the account they already use.
- **Key UI Patterns & Mechanics**: Toggle to activate inside an app the user already has, context-triggered cover (location), usage-based daily billing and one-tap payment through the existing account, with no separate forms.
- **Friction & Cognitive Load Points**: Because cover runs in the background, users may not know exactly when they are covered or what is included. Location is a clear trigger for travel, but there is no equivalent automatic signal for "I am playing football now", so the model does not transfer directly to sport without a manual start.

#### SWOT

> Filled by the group. AI leaves this empty.

- **Strengths**: Simple UI, easy flow
- **Weaknesses**: Be Pay-per-Day; Hard access to support
- **Opportunities**: Easier access to support (person)
- **Threats**: other banks and/or digital banks

---

## 4. Key Lessons & Behavioral Directives for Our Design

Use the audit and the 4 SWOTs.

1. **Friction to Avoid**: [ What interaction flaw we saw in competitors that we will prohibit ]
2. **Opportunity Gap**: [ What unaddressed user need or mental model misalignment we will solve ]
3. **Behavioral Rule**: [ Non-negotiable interaction dynamic we will enforce in our prompt stack ]

---

## Sources

- Mapfre, Accidentes Free Time: https://www.mapfre.es/particulares/seguros-de-accidentes/seguro-actividades-ocio/
- CGD, Seguro de Saude Multicare 1 | 2 | 3 (Fidelidade): https://www.cgd.pt/Particulares/Seguros/Pages/Seguro-Saude-Multicare.aspx
- App Store, Multicare Vitality: https://apps.apple.com/pt/app/multicare-vitality/id1498039497
- Pplware, Via Verde Estacionar: https://pplware.sapo.pt/smartphones-tablets/via-verde-estacionar-pague-estacionamento-rua-app/
- 4gnews, early end of parking in Via Verde: https://4gnews.pt/quase-ninguem-usa-esta-funcao-da-via-verde-que-poupa-dinheiro-no-estacionamento/
- 4gnews, Via Verde Estacionar discontinued (June 2026): https://4gnews.pt/adeus-a-app-via-verde-estacionar-o-que-muda-ja-este-mes/
- Electronic Payments International, Revolut Pay-per-Day: https://www.electronicpaymentsinternational.com/news/revolut-launches-pay-per-day-service

