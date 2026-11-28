"use client"

import { useEffect, useState } from "react"
import type { ZoneId } from "./pricing"

export type ZoneState = {
  zone: ZoneId
  status: "locating" | "ready" | "fallback"
  coords?: { lat: number; lng: number }
}

const NATURE = new Set(["park", "pitch", "garden", "nature_reserve", "wood", "forest", "track", "beach", "sports_centre"])
const BUILT_UP = ["city", "town", "village", "suburb", "city_district", "neighbourhood", "quarter"]

/** Classifies a position from OpenStreetMap reverse geocoding (urban / park / remote). */
async function zoneFromCoords(lat: number, lng: number): Promise<ZoneId> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&lat=${lat}&lon=${lng}`,
  )
  if (!res.ok) throw new Error("reverse geocoding failed")
  const data = (await res.json()) as { type?: string; category?: string; address?: Record<string, string> }
  if (data.category === "leisure" || data.category === "natural" || NATURE.has(data.type ?? "")) return "park"
  const builtUp = BUILT_UP.some((k) => data.address?.[k])
  return builtUp ? "urban" : "remote"
}

/** Browser geolocation to pricing zone. Falls back to urban if denied or unavailable. */
export function useZone(): ZoneState {
  const [state, setState] = useState<ZoneState>({ zone: "urban", status: "locating" })

  useEffect(() => {
    if (!("geolocation" in navigator)) return
    let cancelled = false
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const c = { lat: coords.latitude, lng: coords.longitude }
        try {
          const zone = await zoneFromCoords(c.lat, c.lng)
          if (!cancelled) setState({ zone, status: "ready", coords: c })
        } catch {
          if (!cancelled) setState({ zone: "urban", status: "fallback", coords: c })
        }
      },
      () => !cancelled && setState({ zone: "urban", status: "fallback" }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    )
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
