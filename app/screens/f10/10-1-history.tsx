"use client"

import * as React from "react"
import { BottomNav, Chip, RoundButton, ScreenTitle } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { List, ListItem } from "./_parts"

const BARS = [20, 28, 21, 37.333, 20, 32.667, 44.333, 20, 25.667, 20, 39.667, 56]
const FILTERS = ["All", "Sessions", "Claims"] as const

/** 10.1 History · Figma 254:3198 — monthly bars (current month in indigo), filters, sessions and claims. */
export default function History() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")
  const showClaims = filter !== "Sessions"
  const showSessions = filter !== "Claims"
  return (
    <PhoneScreen
      left={<RoundButton icon="user" href={href("10-4")} aria-label="Profile" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      nav={<BottomNav tab="history" />}
      contentClassName="gap-3"
    >
      <ScreenTitle size={32} muted="covered this month">
        3 h 40
      </ScreenTitle>
      <div className="flex h-[90px] shrink-0 items-end justify-between" aria-label="Hours covered per month">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={i === BARS.length - 1 ? "w-4 rounded-[8px] bg-progress-fill" : "w-4 rounded-[8px] bg-surface-muted"}
            style={{ height: h }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Chip key={f} selected={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      <List>
        {showClaims && (
          <ListItem
            icon="alert"
            iconTone="inverse"
            title="Claim · knee"
            sub="Medical report still needed"
            trailing={<span className="text-[18px] leading-[1.32] font-medium text-text-primary">!</span>}
            href={href("11-7")}
            last={!showSessions}
          />
        )}
        {showSessions && (
          <>
            <ListItem icon="ball" title="Football · Parque da Cidade" sub="Today · 48 min · €X.XX" href={href("10-3")} />
            <ListItem icon="wave" title="Surf · Ericeira" sub="2 Nov · 1 h · €X.XX" href={href("10-3")} last />
          </>
        )}
      </List>
    </PhoneScreen>
  )
}
