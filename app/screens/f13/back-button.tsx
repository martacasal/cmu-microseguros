"use client"

import { useRouter } from "next/navigation"
import { RoundButton } from "@/components/pulse"

/** Back that returns to wherever the person opened the assistant from; falls back to `fallback`. */
export function HistoryBackButton({ fallback }: { fallback: string }) {
  const router = useRouter()
  return (
    <RoundButton
      icon="back"
      aria-label="Back"
      onClick={() => (window.history.length > 1 ? router.back() : router.push(fallback))}
    />
  )
}
