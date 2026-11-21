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
        elif self.path == "/api/state":
            self._json(state)
        else:
            self._send(404, "not found", "text/plain")

    def do_POST(self):
        if self.path != "/api/price":
            return self._send(404, "not found", "text/plain")
        length = int(self.headers.get("Content-Length") or 0)
        try:
            query = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            return self._send(400, json.dumps({"error": "bad JSON"}), "application/json")
        self._json(own_moment, query)

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    print(f"Micro Seguros UI → http://localhost:{PORT}  (Ctrl-C to stop)")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
