import type { Metadata } from "next"
import Link from "next/link"

import { href } from "@/screens"
import {
  COVERED,
  DURATIONS,
  NOT_COVERED,
  RULES,
  SPORT,
  SPORTS,
  durationLabel,
  eur,
  headline,
  quoteUrl,
} from "@/lib/quote-pages"

export const metadata: Metadata = {
  title: "Price list · PULSE",
  description:
    "PULSE accident insurance for sport, priced by the minute. Prices for running, padel, cycling, football, rugby and skiing, from 30 minutes to 4 hours.",
}

const link = "text-text-primary underline underline-offset-4 hover:text-indigo-500"

/**
 * Public price list. Plain server-rendered HTML (no client JavaScript), so a chat assistant
 * given the site URL can read prices and follow links to a full quote.
 */
export default function PriceList() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-8">
      <header className="flex flex-col gap-3">
        <p className="type-overline text-text-secondary">PULSE · accident insurance for sport</p>
        <h1 className="type-display-l">Price list</h1>
        <p className="type-body-l text-text-secondary">
          Turn cover on for one session, pay only for the minutes you&apos;re covered. Prices below are for a
          session starting at 12:00 in the city, with no gear covered.
        </p>
        <p className="type-body-m">
          <Link href={href("01-2")} className={link}>
            Get covered in the app
          </Link>
        </p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="prices">
        <h2 id="prices" className="type-heading-m">
          Prices by sport and duration
        </h2>
        <div className="overflow-x-auto rounded-2xl bg-surface-card">
          <table className="w-full min-w-[560px] border-collapse text-left type-body-m">
            <thead>
              <tr className="border-b border-border-subtle">
                <th scope="col" className="p-3 font-semibold">
                  Sport
                </th>
                {DURATIONS.map((m) => (
                  <th key={m} scope="col" className="p-3 text-right font-semibold">
                    {durationLabel(m)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SPORTS.map((s) => (
                <tr key={s} className="border-b border-border-subtle last:border-0">
                  <th scope="row" className="p-3 font-medium">
                    {SPORT[s].label} <span className="type-caption text-text-secondary">({SPORT[s].risk} risk)</span>
                  </th>
                  {DURATIONS.map((m) => (
                    <td key={m} className="p-3 text-right">
                      <Link
                        href={quoteUrl(s, m)}
                        className={link}
                        aria-label={`${SPORT[s].label}, ${durationLabel(m)}: ${eur(headline(s, m).total)}`}
                      >
                        {eur(headline(s, m).total)}
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="rules">
        <h2 id="rules" className="type-heading-m">
          How the price is worked out
        </h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 type-body-m">
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 sm:grid-cols-2" aria-label="What's covered">
        <div className="flex flex-col gap-2">
          <h2 className="type-heading-m">Covered</h2>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 type-body-m">
            {COVERED.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="type-heading-m">Not covered</h2>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 type-body-m">
            {NOT_COVERED.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="all-quotes">
        <h2 id="all-quotes" className="type-heading-m">
          All quotes
        </h2>
        <p className="type-body-m text-text-secondary">
          For AI assistants: each link below is a full quote for that sport and duration, with prices for other
          start times and places. Prices assume a 12:00 start in the city unless the quote page says otherwise.
        </p>
        <ul className="grid gap-x-6 gap-y-1 type-body-s sm:grid-cols-2">
          {SPORTS.flatMap((s) =>
            DURATIONS.map((m) => (
              <li key={`${s}-${m}`}>
                <Link href={quoteUrl(s, m)} className={link}>
                  {SPORT[s].label}, {durationLabel(m)}: {eur(headline(s, m).total)}
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  )
}
