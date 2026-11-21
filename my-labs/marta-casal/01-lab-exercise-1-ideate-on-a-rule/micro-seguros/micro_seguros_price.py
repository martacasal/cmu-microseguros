"""Micro Seguros · the price for one moment of cover.

A customer covers just the moment they need: a bike ride along the coast, a surf
session, a paddleboard on a lake. This file decides the price, and the one
sentence that explains it to the customer.

Cover is sold in slots of 30 minutes or more: 3 hours is 6 slots of 30 minutes,
20 minutes is 1 slot, and 2 hours can be 4 slots of 30 minutes or 2 slots of an
hour. No moment of cover can last more than 4 hours.
Press ▶ Run in the Terminal tab, then pick 1 to see the seven real moments or
2 to type a moment of your own.
"""

# ── Knobs: the numbers that shape this rule. Ask the AI agent to change them ──
SLOT_MINUTES = 30        # the shortest slot we sell
SLOT_STEPS = [30, 60, 120]   # the slot lengths we can sell, in minutes
MAX_HOURS = 4            # the longest moment of cover we sell
RATE_PER_HOUR = {        # starting price per hour, in euros
    "bike ride": 0.50,
    "surf session": 1.20,
    "paddleboard": 0.35,
}
VALUE_EXTRA = 0.10       # +10% for every €1,000 the item is worth
MINIMUM = 0.50           # never charge less than this
DAY_CAP = 3.00           # never charge more than this for one day

# What we cover. Every activity on the list is covered for now.
COVERED = {
    "bike ride": True,
    "surf session": True,
    "paddleboard": True,
}

# Where the moment happens. Busy, theft-prone places cost a bit more.
PLACE_EXTRA = {          # +% on the price for this place
    "quiet village": 0.00,
    "town": 0.05,
    "beach": 0.15,
    "city centre": 0.30,
}
DEFAULT_PLACE = "town"   # used when we don't know the place

# The weather. Good weather is busy and careless; bad weather is risky.
# Each activity reacts to weather in its own way.
GOOD_WEATHER = "good"    # sunny, calm, dry
BAD_WEATHER = "bad"      # rain, storm, very strong wind
WEATHER_EXTRA = {        # +% (or −%) on the price, per activity and weather
    "bike ride":    {GOOD_WEATHER: 0.10, BAD_WEATHER: 0.20},
    "surf session": {GOOD_WEATHER: 0.00, BAD_WEATHER: 0.40},
    "paddleboard":  {GOOD_WEATHER: 0.00, BAD_WEATHER: 0.25},
}
DEFAULT_WEATHER = GOOD_WEATHER   # used when we don't know the weather

# ── The new idea: the longer the cover, the cheaper each slot ───────────────
# A 30-minute slot costs the full rate. A 60-minute slot costs 10% less per
# half hour, and a 120-minute slot costs 20% less per half hour. So a customer
# who buys a longer stretch of cover pays a little less for each half hour.
LONG_SLOT_DISCOUNT = {   # −% on the price of each slot, by slot length
    30: 0.00,
    60: 0.10,
    120: 0.20,
}


# ── The rule ───────────────────────────────────────────────────────────────
def slots(hours):
    """The slots a moment of cover is sold in: the fewest, longest slots that fit.

    Cover is never longer than MAX_HOURS, and a part slot counts as a whole one.
    """
    minutes = min(hours, MAX_HOURS) * 60
    chosen = []
    for step in sorted(SLOT_STEPS, reverse=True):
        while minutes >= step:
            chosen.append(step)
            minutes -= step
    if minutes > 0:                      # a leftover part slot
        chosen.append(SLOT_MINUTES)
    return chosen or [SLOT_MINUTES]      # at least one slot


def slot_price(moment, step):
    """The price of one slot of this length, after the long-slot discount."""
    full = RATE_PER_HOUR[moment] * step / 60
    return full * (1 - LONG_SLOT_DISCOUNT[step])


def price(moment, hours, value=0, place=DEFAULT_PLACE, weather=DEFAULT_WEATHER):
    """The price in euros for one moment of cover, or None if we don't cover it."""
    if not COVERED[moment]:
        return None
    total = sum(slot_price(moment, step) for step in slots(hours))
    total *= 1 + VALUE_EXTRA * value / 1000
    total *= 1 + PLACE_EXTRA[place]
    total *= 1 + WEATHER_EXTRA[moment][weather]
    return round(min(max(total, MINIMUM), DAY_CAP), 2)


def why(moment, hours, value=0, place=DEFAULT_PLACE, weather=DEFAULT_WEATHER):
    """The one sentence a customer sees next to the price."""
    if not COVERED[moment]:
        return f"Sorry, we don't cover {moment}."
    chosen = slots(hours)
    slot_text = " + ".join(f"{step} min" for step in chosen)
    reasons = [
        f"{slot_text} of {moment} "
        f"at €{RATE_PER_HOUR[moment] * SLOT_MINUTES / 60:.2f} per 30 min"
    ]
    saved = sum(LONG_SLOT_DISCOUNT[step] for step in chosen if step > SLOT_MINUTES)
    if saved:
        reasons.append("longer slots cost less per half hour")
    if hours > MAX_HOURS:
        reasons.append(f"only the first {MAX_HOURS} hours are covered")
    if value:
        reasons.append(f"+{VALUE_EXTRA * value / 10:g}% because it's worth €{value:,.0f}")
    if PLACE_EXTRA[place]:
        reasons.append(f"+{PLACE_EXTRA[place] * 100:g}% in the {place}")
    weather_extra = WEATHER_EXTRA[moment][weather]
    if weather_extra:
        reasons.append(f"{weather_extra * 100:+g}% for {weather} weather")
    total = price(moment, hours, value, place, weather)
    if total == MINIMUM:
        reasons.append("the minimum price applies")
    if total == DAY_CAP:
        reasons.append("capped at the day price")
    return ", ".join(reasons) + "."


def price_without_long_slots(moment, hours, value=0, place=DEFAULT_PLACE,
                             weather=DEFAULT_WEATHER):
    """The price the old rule would have charged: every slot at the full rate."""
    if not COVERED[moment]:
        return None
    total = sum(RATE_PER_HOUR[moment] * step / 60 for step in slots(hours))
    total *= 1 + VALUE_EXTRA * value / 1000
    total *= 1 + PLACE_EXTRA[place]
    total *= 1 + WEATHER_EXTRA[moment][weather]
    return round(min(max(total, MINIMUM), DAY_CAP), 2)


# ── Seven real moments, and what the team expects ──────────────────────────
#   moment,          hours, value, place,          weather,      lowest €, highest €, the moment
SCENARIOS = [
    ("bike ride",       3,   600, "beach",        GOOD_WEATHER, 1.50, 2.50, "Bike ride along the beach, sunny afternoon"),
    ("bike ride",       3,   600, "beach",        BAD_WEATHER,  1.50, 2.50, "Same bike ride, same beach, rain all afternoon"),
    ("bike ride",     0.5,   300, "town",         GOOD_WEATHER, 0.50, 0.50, "A quick ride still costs 50 cents"),
    ("bike ride",      12,   600, "city centre",  GOOD_WEATHER, 2.50, 3.50, "A whole day is capped"),
    ("surf session",    2,     0, "beach",        GOOD_WEATHER, 2.00, 3.00, "A normal surf session"),
    ("surf session",    2,     0, "beach",        BAD_WEATHER,  2.80, 4.00, "Surfing in a storm costs more, but not double"),
    ("paddleboard",     4,   400, "quiet village", GOOD_WEATHER, 0.50, 1.50, "A paddleboard on a quiet lake"),
]


def show():
    """Option 1: the seven real moments, old price next to new price."""
    print(f"Micro Seguros · seven moments, sold in slots of "
          f"{SLOT_STEPS[0]}–{SLOT_STEPS[-1]} min, up to {MAX_HOURS} hours")
    print("Old = every slot at the full rate. New = longer slots cost less.\n")
    holding = 0
    for moment, hours, value, place, weather, low, high, label in SCENARIOS:
        new = price(moment, hours, value, place, weather)
        old = price_without_long_slots(moment, hours, value, place, weather)
        shown = 0.00 if new is None else new
        ok = low <= shown <= high
        holding += ok
        expected = f"€{low:.2f}" if low == high else f"€{low:.2f}–€{high:.2f}"
        if new is None:
            side_by_side = "no cover  →  no cover"
        else:
            side_by_side = f"€{old:.2f}  →  €{new:.2f}"
        print(f"{'✓' if ok else '✗'}  {side_by_side:<22} {label}  (expected {expected})")
        print(f"          {why(moment, hours, value, place, weather)}")
    print(f"\n{holding}/{len(SCENARIOS)} expectations hold.", end=" ")
    if holding == len(SCENARIOS):
        print("Ask the AI agent to change a knob or try an idea, then press ▶ Run again.")
    else:
        print("Is the rule wrong, or the expectation?")


# ── Option 2: type a moment of your own ────────────────────────────────────
def ask_choice(question, options, default):
    """Ask for one of the options by number. An empty answer takes the default."""
    print(f"\n{question}")
    for number, option in enumerate(options, start=1):
        print(f"  {number}) {option}")
    while True:
        answer = input(f"Pick a number (or press Enter for {default}): ").strip()
        if answer == "":
            return default
        if answer.isdigit() and 1 <= int(answer) <= len(options):
            return options[int(answer) - 1]
        print(f"  Please type a number from 1 to {len(options)}.")


def ask_number(question, example, default):
    """Ask for a number. An empty answer takes the default, anything odd is asked again."""
    while True:
        answer = input(f"{question} (e.g. {example}, or press Enter for {default}): ").strip()
        if answer == "":
            return default
        try:
            number = float(answer.replace(",", "."))
        except ValueError:
            print("  That isn't a number — try something like 2 or 1.5.")
            continue
        if number < 0:
            print("  Please use a number of 0 or more.")
            continue
        return number


def try_your_own():
    """Option 2: the customer builds a moment, and we price it old and new."""
    moment = ask_choice("Which outdoor activity?", list(RATE_PER_HOUR), "bike ride")
    hours = ask_number("How many hours?", "2", 2)
    value = ask_number("What is it worth, in euros? (0 if you don't know)", "600", 0)
    place = ask_choice("Where does it happen?", list(PLACE_EXTRA), DEFAULT_PLACE)
    weather = ask_choice("What is the weather like?",
                         [GOOD_WEATHER, BAD_WEATHER], DEFAULT_WEATHER)

    new = price(moment, hours, value, place, weather)
    old = price_without_long_slots(moment, hours, value, place, weather)
    print()
    if new is None:
        print(f"no cover   {why(moment, hours, value, place, weather)}")
    else:
        print(f"old €{old:.2f}  →  new €{new:.2f}")
        print(f"   {why(moment, hours, value, place, weather)}")


def menu():
    """The short menu you see when you press ▶ Run."""
    while True:
        print("\nMicro Seguros · price for one moment of cover")
        print("  1) run the seven real moments (old price → new price)")
        print("  2) try a moment of your own")
        print("  q) quit")
        choice = input("Pick 1, 2 or q: ").strip().lower()
        if choice == "1":
            print()
            show()
        elif choice == "2":
            try_your_own()
        elif choice in ("q", ""):
            print("Bye — see you at the beach.")
            return
        else:
            print("  Please type 1, 2 or q.")


if __name__ == "__main__":
    menu()
