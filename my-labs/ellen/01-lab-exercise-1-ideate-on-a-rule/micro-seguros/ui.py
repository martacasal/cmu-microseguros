"""Micro Seguros · a small web UI for the price rule.

Run:  ../../.venv/bin/python ui.py   then open http://localhost:8765

The page always uses the rule in micro_seguros_price.py. The file is reloaded
on every request, so when a knob changes, press "Reload rule" (or switch back
to the tab) and the page shows the new prices. Standard library only.
"""

import importlib
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import micro_seguros_price as rule

PORT = 8765
PAGE = Path(__file__).with_name("ui.html")


def fresh():
    """Re-read micro_seguros_price.py so knob changes show up immediately."""
    return importlib.reload(rule)


def knobs(r):
    return {
        name: getattr(r, name)
        for name in dir(r)
        if name.isupper() and isinstance(getattr(r, name), (bool, int, float, dict))
    }


def state():
    r = fresh()
    moments = []
    for moment, hours, value, wind, low, high, label in r.SCENARIOS:
        total = r.price(moment, hours, value, wind)
        moments.append({
            "label": label, "moment": moment, "price": total,
            "low": low, "high": high, "ok": low <= total <= high,
            "why": r.why(moment, hours, value, wind),
        })

    used = []
    for moment, bought, stayed, label in r.USED_SCENARIOS:
        used.append({
            "label": label, "credit": r.unused_minutes(bought, stayed),
            "why": r.why(moment, bought, used=stayed),
        })

    credit = []
    for moment, bought, stayed, old_credit, label in r.CREDIT_SCENARIOS:
        paid_minutes = bought * 60 - old_credit
        hours = r.minutes_to_hours(paid_minutes)
        credit.append({
            "label": label, "price": r.price(moment, hours),
            "paid_minutes": paid_minutes,
            "new_credit": r.unused_minutes(bought, stayed),
            "why": r.why(moment, hours, credit_used=old_credit),
        })

    compare = []
    for moment, hours, value, wind, cred, label in r.COMPARE_CASES:
        compare.append({
            "label": label,
            "old": r.price(moment, hours, value, wind, 0),
            "new": r.price(moment, hours, value, wind, cred),
        })

    return {
        "knobs": knobs(r),
        "moments": moments, "used": used, "credit": credit, "compare": compare,
        "holding": sum(m["ok"] for m in moments) + len(used) + len(credit),
        "total": len(moments) + len(used) + len(credit),
    }


def own_moment(q):
    """Same steps as option 2 in the terminal menu."""
    r = fresh()
    moment = q["moment"]
    if moment not in r.RATE_PER_HOUR:
        raise ValueError(f"unknown moment: {moment}")
    hours = max(float(q.get("hours") or 0), 0)
    value = max(float(q.get("value") or 0), 0)
    wind = max(float(q.get("wind") or 0), 0)
    out = {
        "price": r.price(moment, hours, value, wind),
        "why": r.why(moment, hours, value, wind),
    }
    if q.get("stayed") not in (None, ""):
        stayed = max(float(q["stayed"]), 0)
        out["stayed"] = {
            "credit": r.unused_minutes(hours, stayed),
            "why": r.why(moment, hours, value, wind, used=stayed),
        }
    if q.get("old_credit") not in (None, ""):
        old_credit = max(float(q["old_credit"]), 0)
        paid_minutes = max(hours * 60 - old_credit, 0)
        paid_hours = r.minutes_to_hours(paid_minutes)
        out["with_credit"] = {
            "price": r.price(moment, paid_hours, value, wind),
            "paid_minutes": paid_minutes,
            "why": r.why(moment, paid_hours, value, wind, credit_used=old_credit),
        }
    return out


# ── Mobile app (app.html): the customer's side of the same rule ─────────────
APP = Path(__file__).with_name("app.html")


def _num(q, key, default=0.0):
    value = q.get(key)
    return max(float(value), 0.0) if value not in (None, "") else default


def config():
    r = fresh()
    return {
        "rates": r.RATE_PER_HOUR, "slot": r.SLOT_MINUTES, "max_hours": r.MAX_HOURS,
        "minimum": r.MINIMUM, "cap": r.DAY_CAP, "windy_kmh": r.WINDY_KMH,
        "windy_extra": r.WINDY_EXTRA, "value_extra": r.VALUE_EXTRA,
        "credit_never_expires": getattr(r, "CREDIT_NEVER_EXPIRES", True),
    }


def _breakdown(r, moment, covered, value, wind, credit, final):
    """Split the price into the steps the rule applies, so the bars add up.

    The last row absorbs whatever the minimum or the cap changed, so the
    rows always sum to the real price even if the rule changes shape.
    """
    try:
        base = r.RATE_PER_HOUR[moment] * covered
        after_value = base * (1 + r.VALUE_EXTRA * value / 1000)
        after_wind = after_value * (1 + r.WINDY_EXTRA) if wind > r.WINDY_KMH else after_value
        after_credit = after_wind * (1 - r.returning_discount(credit))
    except Exception:
        return [{"label": "Price", "amount": final}]
    rows = [
        ("Time", base),
        ("Item value", after_value - base),
        ("Strong wind", after_wind - after_value),
        ("Coming back", after_credit - after_wind),
        ("Minimum price" if final > after_credit else "Top price cap", final - after_credit),
    ]
    return [{"label": k, "amount": round(v, 2)} for k, v in rows if abs(v) >= 0.005]


def quote(q):
    """Price for a cover, optionally paying the first minutes with old credit."""
    r = fresh()
    moment = q["moment"]
    if moment not in r.RATE_PER_HOUR:
        raise ValueError(f"unknown moment: {moment}")
    hours, value, wind = _num(q, "hours"), _num(q, "value"), _num(q, "wind")
    credit = int(_num(q, "credit"))
    covered = r.covered_hours(hours)
    full = r.price(moment, hours, value, wind, credit)
    out = {
        "covered_hours": covered, "full": full, "pay": full, "credit_used": 0,
        "why": r.why(moment, hours, value, wind, credit_minutes=credit),
        "breakdown": _breakdown(r, moment, covered, value, wind, credit, full),
    }
    if q.get("use_credit") and credit > 0:
        used = min(credit, int(covered * 60))
        paid_hours = r.minutes_to_hours(covered * 60 - used)
        out.update(
            pay=r.price(moment, paid_hours, value, wind, credit), credit_used=used,
            why=r.why(moment, paid_hours, value, wind, credit_used=used, credit_minutes=credit),
        )
    return out


def extend(q):
    r = fresh()
    moment, value, wind = q["moment"], _num(q, "value"), _num(q, "wind")
    old = r.covered_hours(_num(q, "hours"))
    new = r.covered_hours(old + _num(q, "extra"))
    return {
        "new_hours": new, "added_hours": new - old,
        "extra_cost": round(r.price(moment, new, value, wind) - r.price(moment, old, value, wind), 2),
    }


def end(q):
    r = fresh()
    moment, hours = q["moment"], _num(q, "hours")
    used = _num(q, "used_hours")
    return {
        "credit": r.unused_minutes(hours, used),
        "why": r.why(moment, hours, _num(q, "value"), _num(q, "wind"), used=used),
    }


API_POST = {"/api/price": own_moment, "/api/quote": quote, "/api/extend": extend, "/api/end": end}


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body, kind):
        data = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def _json(self, fn, *args):
        try:
            self._send(200, json.dumps(fn(*args)), "application/json")
        except Exception as error:  # show rule errors in the page, not a crash
            self._send(400, json.dumps({"error": f"{type(error).__name__}: {error}"}),
                       "application/json")

    def do_GET(self):
        if self.path == "/":
            self._send(200, PAGE.read_text(encoding="utf-8"), "text/html; charset=utf-8")
        elif self.path in ("/app", "/app/"):
            self._send(200, APP.read_text(encoding="utf-8"), "text/html; charset=utf-8")
        elif self.path == "/api/state":
            self._json(state)
        elif self.path == "/api/config":
            self._json(config)
        else:
            self._send(404, "not found", "text/plain")

    def do_POST(self):
        fn = API_POST.get(self.path)
        if fn is None:
            return self._send(404, "not found", "text/plain")
        length = int(self.headers.get("Content-Length") or 0)
        try:
            query = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, json.dumps({"error": "bad JSON"}), "application/json")
        self._json(fn, query)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print(f"Micro Seguros UI  → http://localhost:{PORT}")
    print(f"Mobile app        → http://localhost:{PORT}/app   (Ctrl-C to stop)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
