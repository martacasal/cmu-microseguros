import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { href } from "@/screens"
import {
  COVERED,
  DEFAULT_START_HOUR,
  DEFAULT_ZONE,
  DURATIONS,
  MIN_MINUTES,
  NOT_COVERED,
  SPORT,
  SPORTS,
  TIMES,
  ZONE,
  ZONES,
  durationLabel,
  eur,
  gearFee,
  headline,
  isDuration,
  isSport,
  quote,
  quoteUrl,
} from "@/lib/quote-pages"

/** Every sport × duration is built at build time; anything else is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return SPORTS.flatMap((sport) => DURATIONS.map((m) => ({ sport, minutes: String(m) })))
}

async function read(params: PageProps<"/quote/[sport]/[minutes]">["params"]) {
  const { sport, minutes } = await params
  const m = Number(minutes)
  if (!isSport(sport) || !isDuration(m)) notFound()
  return { sport, minutes: m }
}

export async function generateMetadata({ params }: PageProps<"/quote/[sport]/[minutes]">): Promise<Metadata> {
  const { sport, minutes } = await read(params)
  const price = eur(headline(sport, minutes).total)
  return {
    title: `${SPORT[sport].label}, ${durationLabel(minutes)}: ${price} · PULSE`,
    description: `PULSE accident cover for ${durationLabel(minutes)} of ${SPORT[sport].label.toLowerCase()}: ${price}, starting at 12:00 in the city.`,
  }
}

const link = "text-text-primary underline underline-offset-4 hover:text-indigo-500"

export default async function QuotePage({ params }: PageProps<"/quote/[sport]/[minutes]">) {
  const { sport, minutes } = await read(params)
  const label = SPORT[sport].label
  const q = headline(sport, minutes)
  const rows = [
    ["Billed time", `${durationLabel(q.billedMinutes)}${q.billedMinutes > minutes ? ` (minimum ${MIN_MINUTES} min)` : ""}`],
    ["Time", eur(q.time)],
    [`Sport risk (${SPORT[sport].risk})`, eur(q.risk)],
    ["Time of day and place", eur(q.conditions)],
    ...(q.minTopUp > 0.005 ? [["Top-up to the minimum session price", eur(q.minTopUp)]] : []),
  ]

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-8">
      <header className="flex flex-col gap-3">
        <p className="type-overline text-text-secondary">
          <Link href="/quote" className={link}>
            PULSE price list
          </Link>{" "}
          · quote
        </p>
        <h1 className="type-display-l">
          {durationLabel(minutes)} of {label.toLowerCase()}: {eur(q.total)}
        </h1>
        <p className="type-body-l text-text-secondary">
          PULSE accident cover for a {durationLabel(minutes)} {label.toLowerCase()} session starting at{" "}
          {DEFAULT_START_HOUR}:00 in an {ZONE[DEFAULT_ZONE].label.toLowerCase()}, with no gear covered. Cover
          switches off by itself at the end.
        </p>
        <p className="type-body-m">
          <Link href={href("01-2")} className={link}>
            Get covered in the app
          </Link>
        </p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="breakdown">
        <h2 id="breakdown" className="type-heading-m">
          How it adds up
        </h2>
        <dl className="flex flex-col rounded-2xl bg-surface-card type-body-m">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border-subtle p-3">
              <dt>{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 p-3 font-semibold">
            <dt>Total</dt>
            <dd className="text-right">{eur(q.total)}</dd>
          </div>
        </dl>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="variants">
        <h2 id="variants" className="type-heading-m">
          Other start times and places
        </h2>
        <div className="overflow-x-auto rounded-2xl bg-surface-card">
          <table className="w-full min-w-[480px] border-collapse text-left type-body-m">
            <thead>
              <tr className="border-b border-border-subtle">
                <th scope="col" className="p-3 font-semibold">
                  Start
                </th>
                {ZONES.map((z) => (
                  <th key={z.id} scope="col" className="p-3 text-right font-semibold">
                    {z.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMES.map((t) => (
                <tr key={t.hour} className="border-b border-border-subtle last:border-0">
                  <th scope="row" className="p-3 font-medium">
                    {t.label}
                  </th>
                  {ZONES.map((z) => (
                    <td key={z.id} className="p-3 text-right">
                      {eur(quote({ minutes, sport, startHour: t.hour, zone: z.id }).total)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sport === "football" && (
          <p className="type-body-m text-text-secondary">
            Covering your football adds {eur(gearFee("football"))}: {eur(q.total)} becomes{" "}
            {eur(quote({ minutes, sport, gear: ["football"] }).total)}.
          </p>
        )}
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

      <nav className="flex flex-col gap-2" aria-label="Other durations">
        <h2 className="type-heading-m">{label}, other durations</h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 type-body-m">
          {DURATIONS.filter((m) => m !== minutes).map((m) => (
            <li key={m}>
              <Link href={quoteUrl(sport, m)} className={link}>
                {durationLabel(m)}: {eur(headline(sport, m).total)}
              </Link>
            </li>
          ))}
        </ul>
        <p className="type-body-m">
          <Link href="/quote" className={link}>
            All sports and durations
          </Link>
        </p>
      </nav>
    </main>
  )
}
