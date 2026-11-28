"use client"

import * as React from "react"
import * as maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

// Worker files are copied from node_modules/maplibre-gl/dist into public/ (bundlers can't resolve the worker URL)
maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs")

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron"

/** Low-detail vector map: light base style with labels and icons removed. */
export function LocationMap({ lat, lng, zoom = 14.5, className }: { lat: number; lng: number; zoom?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return
    let map: maplibregl.Map | undefined
    let cancelled = false
    fetch(STYLE_URL)
      .then((r) => r.json())
      .then((style) => {
        if (cancelled || !ref.current) return
        style.layers = style.layers.filter((l: { type: string }) => l.type !== "symbol")
        map = new maplibregl.Map({
          container: ref.current,
          style,
          center: [lng, lat],
          zoom,
          interactive: false,
          attributionControl: false,
        })
      })
      .catch(() => {})
    return () => {
      cancelled = true
      map?.remove()
    }
  }, [lat, lng, zoom])

  return (
    <div className={className}>
      <div ref={ref} className="size-full" />
    </div>
  )
}
