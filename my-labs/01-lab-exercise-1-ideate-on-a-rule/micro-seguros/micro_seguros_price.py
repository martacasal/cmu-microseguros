"""Micro Seguros · the price for one moment of cover.

A customer covers just the moment they need: a bike parked at the beach, a surf
session, gear borrowed from a friend. This file decides the price, and the one
sentence that explains it to the customer.

Press ▶ Run in the Terminal tab: a short menu opens.
  1) run the twelve real moments
  2) try your own moment
  3) compare an idea: old price vs new price
  q) quit
"""

# ── Knobs: the numbers that shape this rule. Ask the AI agent to change them ──
RATE_PER_HOUR = {        # starting price per hour, in euros
    "bike parked": 0.50,
    "surf session": 1.20,
    "borrowed gear": 0.35,
}
VALUE_EXTRA = 0.10       # +10% for every €1,000 the item is worth
WINDY_KMH = 30           # wind above this counts as strong
WINDY_EXTRA = 0.25       # +25% in strong wind: riskier, but not double
MINIMUM = 0.50           # never charge less than this
SLOT_MINUTES = 30        # cover is sold in 30-minute slots, never less
MAX_HOURS = 4            # one cover lasts at most 4 hours: no full-day cover
DAY_CAP = 4.00           # never charge more than this for one cover
CREDIT_NEVER_EXPIRES = True   # unused minutes stay as credit forever

# ── The idea on trial: a small discount for coming back ────────────────────
# Someone who already has credit with us pays a little less on the next cover.
RETURNING_OFF = 0.0      # 0 = the idea is off. Try 0.10 for 10% off
RETURNING_EXTRA = 0.0    # a second idea: +10% off for every 30 min of credit


# ── The rule ───────────────────────────────────────────────────────────────
def covered_hours(hours):
    """Round up to whole 30-minute slots, and never more than 4 hours."""
    slots = -(-hours * 60 // SLOT_MINUTES)   # round up to the next slot
    return min(slots * SLOT_MINUTES / 60, MAX_HOURS)


def returning_discount(credit_minutes):
    """How much off, from 0 to 1, for someone coming back with credit."""
    if credit_minutes <= 0:
        return 0.0
    off = RETURNING_OFF + RETURNING_EXTRA * (credit_minutes // SLOT_MINUTES)
    return min(off, 0.5)     # never more than half price


def price(moment, hours, value=0, wind=0, credit_minutes=0):
    """The price in euros for one moment of cover."""
    hours = covered_hours(hours)
    total = RATE_PER_HOUR[moment] * hours
    total *= 1 + VALUE_EXTRA * value / 1000
    if wind > WINDY_KMH:
        total *= 1 + WINDY_EXTRA
    total *= 1 - returning_discount(credit_minutes)
    return round(min(max(total, MINIMUM), DAY_CAP), 2)


def unused_minutes(bought_hours, used_hours):
    """Minutes paid for but not used: they stay as credit for next time."""
    bought = covered_hours(bought_hours) * 60
    used = min(used_hours * 60, bought)      # you can't use more than you bought
    return int(bought - used)


def minutes_to_hours(minutes):
    """Turn minutes into the hours the price rule understands."""
    return minutes / 60


def why(moment, hours, value=0, wind=0, used=None, credit_used=0, credit_minutes=0):
    """The one sentence a customer sees next to the price."""
    covered = covered_hours(hours)
    reasons = [f"{covered:g}h of {moment} at €{RATE_PER_HOUR[moment]:.2f}/h"]
    if covered > hours:
        reasons.append(f"rounded up to the next {SLOT_MINUTES} minutes")
    if hours > MAX_HOURS:
        reasons.append(f"only {MAX_HOURS}h can be covered at once")
    if value:
        reasons.append(f"+{VALUE_EXTRA * value / 10:g}% because it's worth €{value:g}")
    if wind > WINDY_KMH:
        reasons.append(f"+{WINDY_EXTRA * 100:g}% for strong wind")
    off = returning_discount(credit_minutes)
    if off:
        reasons.append(f"-{off * 100:g}% for coming back with credit")
    total = price(moment, hours, value, wind, credit_minutes)
    if total == MINIMUM:
        reasons.append("the minimum price applies")
    if total == DAY_CAP:
        reasons.append("capped at the top price")
    if credit_used:
        reasons.append(f"{credit_used:g} min of old credit paid for part of it")
    if used is not None:
        left = unused_minutes(hours, used)
        if left:
            reasons.append(f"you used {used * 60:g} min, so {left} min stay as credit "
                           f"with no expiry date")
        else:
            reasons.append("you used all of it, no credit left")
    return ", ".join(reasons) + "."


# ── Twelve real moments, and what the team expects ─────────────────────────
#   moment,          hours, value, wind, lowest €, highest €, the moment
SCENARIOS = [
    ("bike parked",     3,   600,   0,  1.50, 2.50, "Bike at the beach for the afternoon"),
    ("bike parked",   0.5,   300,   0,  0.50, 0.50, "A quick stop still costs 50 cents"),
    ("bike parked",  0.25,   300,   0,  0.50, 0.50, "15 minutes is sold as 30 minutes"),
    ("bike parked",  2.08,   300,   0,  1.00, 1.50, "2h05 is sold as 2h30"),
    ("bike parked",    12,   600,   0,  1.50, 2.50, "A whole day is not possible: 4h max"),
    ("surf session",    2,     0,  12,  2.00, 3.00, "A normal surf session"),
    ("surf session",    2,     0,  40,  2.80, 4.00, "Strong wind costs more, but not double"),
    ("borrowed gear",   4,   400,   0,  1.00, 2.00, "A friend's paddleboard for the afternoon"),
    ("surf session",    6,     0,  12,  4.00, 5.50, "A long day on the water is cut to 4h"),
]

# Moments where we also know how long the person really stayed.
#   moment, hours bought, hours used, the moment
USED_SCENARIOS = [
    ("bike parked", 0.5, 0.25, "Bought 30 min, stayed 15: 15 min become credit"),
    ("surf session", 2, 2, "Used the whole session: no credit"),
]

# A person coming back with credit from an earlier session.
#   moment, hours bought, hours used, old credit in minutes, the moment
CREDIT_SCENARIOS = [
    ("bike parked", 1, 0.5, 10,
     "Comes back with 10 min of old credit, buys 1h, stays 30 min"),
]


def show():
    print("Micro Seguros · twelve moments\n")
    holding = 0
    for moment, hours, value, wind, low, high, label in SCENARIOS:
        total = price(moment, hours, value, wind)
        ok = low <= total <= high
        holding += ok
        expected = f"€{low:.2f}" if low == high else f"€{low:.2f}–{high:.2f}"
        print(f"{'✓' if ok else '✗'}  €{total:<5.2f} {label}  (expected {expected})")
        print(f"          {why(moment, hours, value, wind)}")

    print("\nWhen someone leaves early\n")
    for moment, bought, used, label in USED_SCENARIOS:
        left = unused_minutes(bought, used)
        print(f"•  {label}  →  {left} min credit")
        print(f"          {why(moment, bought, used=used)}")

    print("\nWhen someone comes back with old credit\n")
    for moment, bought, used, old_credit, label in CREDIT_SCENARIOS:
        # The old credit pays for the first minutes of this session.
        paid_minutes = bought * 60 - old_credit
        total = price(moment, minutes_to_hours(paid_minutes))
        left = unused_minutes(bought, used)
        print(f"•  {label}")
        print(f"          €{total:.2f} to pay for the {paid_minutes:g} min not covered "
              f"by credit, and {left} min of new credit")
        print(f"          {why(moment, minutes_to_hours(paid_minutes), credit_used=old_credit)}")

    total_cases = len(SCENARIOS) + len(USED_SCENARIOS) + len(CREDIT_SCENARIOS)
    holding += len(USED_SCENARIOS) + len(CREDIT_SCENARIOS)   # shown, not checked
    print(f"\n{holding}/{total_cases} expectations hold.", end=" ")
    if holding == total_cases:
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


# ── Your own moment ────────────────────────────────────────────────────────
def ask_number(question, example, default=None):
    """Ask for a number. An empty answer keeps the default."""
    while True:
        answer = input(f"{question} (e.g. {example}): ").strip().replace(",", ".")
        if answer == "" and default is not None:
            return default
        try:
            number = float(answer)
        except ValueError:
            print("  Please type a number, like 2 or 1.5.")
            continue
        if number < 0:
            print("  Please type a number of zero or more.")
            continue
        return number


def ask_yes(question):
    """A simple yes/no question."""
    return input(f"{question} (y/n): ").strip().lower().startswith("y")


def try_own_moment():
    """Let the person describe one moment and see the price."""
    print("\nYour own moment")
    names = list(RATE_PER_HOUR)
    for number, name in enumerate(names, start=1):
        print(f"  {number}) {name}  (€{RATE_PER_HOUR[name]:.2f}/h)")
    while True:
        pick = input(f"Which one? (1 to {len(names)}): ").strip()
        if pick.isdigit() and 1 <= int(pick) <= len(names):
            moment = names[int(pick) - 1]
            break
        print(f"  Please type a number from 1 to {len(names)}.")

    hours = ask_number("How long do you want cover for, in hours", "2 or 0.5")
    value = ask_number("What is the item worth in euros", "600", default=0)
    wind = ask_number("How windy is it, in km/h", "40", default=0)

    total = price(moment, hours, value, wind)
    print(f"\n  €{total:.2f} for {moment}")
    print(f"  {why(moment, hours, value, wind)}")

    if ask_yes("\nDo you know how long you really stayed?"):
        used = ask_number("How long did you really stay, in hours", "0.25", default=0)
        left = unused_minutes(hours, used)
        print(f"  {left} min of credit for next time")
        print(f"  {why(moment, hours, value, wind, used=used)}")

    if ask_yes("\nAny old credit to use?"):
        old_credit = ask_number("How many minutes of old credit", "10", default=0)
        paid_minutes = max(hours * 60 - old_credit, 0)
        total = price(moment, minutes_to_hours(paid_minutes), value, wind)
        print(f"  €{total:.2f} to pay for the {paid_minutes:g} min not covered by credit")
        print(f"  {why(moment, minutes_to_hours(paid_minutes), value, wind, credit_used=old_credit)}")


# ── Compare an idea: old price vs new price ────────────────────────────────
#   moment, hours, value, wind, credit in minutes, the moment
COMPARE_CASES = [
    ("bike parked",    3,   600,   0,   0, "Bike at the beach for the afternoon"),
    ("bike parked",  0.5,   300,   0,   0, "A quick stop"),
    ("bike parked",   12,   600,   0,   0, "A whole day, cut to 4h"),
    ("surf session",   2,     0,  12,   0, "A normal surf session"),
    ("surf session",   2,     0,  40,   0, "Strong wind"),
    ("borrowed gear",  4,   400,   0,   0, "A friend's paddleboard"),
    ("bike parked",    1,   300,   0,  30, "Coming back with 30 min of credit"),
    ("surf session",   2,     0,  12,  60, "Coming back with 1h of credit"),
]


def compare_idea():
    """Show every moment twice: with the idea off, and with the idea on."""
    print("\nThe idea on trial: a discount for coming back with credit")
    print(f"  off: {RETURNING_OFF * 100:g}% off, plus {RETURNING_EXTRA * 100:g}% "
          f"for every {SLOT_MINUTES} min of credit\n")
    print(f"  {'moment':<44} {'old':>7} {'new':>7}   change")
    for moment, hours, value, wind, credit, label in COMPARE_CASES:
        old = price(moment, hours, value, wind, 0)          # idea off
        new = price(moment, hours, value, wind, credit)     # idea on
        if new < old:
            change = f"-€{old - new:.2f}"
        elif new > old:
            change = f"+€{new - old:.2f}"
        else:
            change = "same"
        print(f"  {label:<44} €{old:<6.2f} €{new:<6.2f}   {change}")
    print("\n  The new price only moves for people who come back with credit.")


# ── The menu ───────────────────────────────────────────────────────────────
def menu():
    while True:
        print("\nMicro Seguros")
        print("  1) run the twelve real moments")
        print("  2) try your own moment")
        print("  3) compare an idea: old price vs new price")
        print("  q) quit")
        choice = input("Pick one: ").strip().lower()
        if choice == "1":
            print()
            show()
        elif choice == "2":
            try_own_moment()
        elif choice == "3":
            compare_idea()
        elif choice in ("q", ""):
            print("Bye.")
            return
        else:
            print("Please type 1, 2, 3 or q.")


if __name__ == "__main__":
    menu()
