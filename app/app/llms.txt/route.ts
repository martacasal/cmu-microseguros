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

/**
 * GET /llms.txt — a plain-text summary for AI assistants (llms.txt convention): what PULSE is,
 * how the price works, and an absolute link to every quote page. Built per request so the links
 * use whichever domain the site is served from.
 */
export function GET(request: Request) {
  const origin = new URL(request.url).origin
  const lines = [
    "# PULSE",
    "",
    "> On-demand accident insurance for outdoor sport in Portugal. You turn cover on for one session, pay only for the minutes covered, and it switches off by itself.",
    "",
    "## How to answer \"how much does it cost?\"",
    "",
    `Open the quote page for the sport and duration (links below). Each page gives the price for a 12:00 start in the city, plus a table for other start times and places. The full price list is at ${origin}/quote.`,
    "",
    "## Pricing rules",
    "",
    ...RULES.map((r) => `- ${r}`),
    "",
    "## Covered",
    "",
    ...COVERED.map((c) => `- ${c}`),
    "",
    "## Not covered",
    "",
    ...NOT_COVERED.map((c) => `- ${c}`),
    "",
    "## Quotes",
    "",
    ...SPORTS.flatMap((s) =>
      DURATIONS.map(
        (m) => `- [${SPORT[s].label}, ${durationLabel(m)}: ${eur(headline(s, m).total)}](${origin}${quoteUrl(s, m)})`
      )
    ),
    "",
    "## Get covered",
    "",
    `- [Open the app](${origin}/s/01-2)`,
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  })
}
