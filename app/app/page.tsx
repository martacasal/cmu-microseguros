import Link from "next/link"

import { flows, href } from "@/screens"

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-8">
      <header className="flex flex-col gap-2">
        <span className="type-overline text-text-secondary">PULSE · Ink &amp; Coral</span>
        <h1 className="type-display-l">All screens</h1>
        <p className="type-body-l text-text-secondary">
          Clickable prototype from Figma (Section 1). Start at{" "}
          <Link href={href("01-1")} className="text-text-primary underline underline-offset-4">
            01.1 Welcome
          </Link>{" "}
          or open any screen below. Components live in{" "}
          <Link href="/design-system" className="text-text-primary underline underline-offset-4">
            Design system
          </Link>
          .
        </p>
      </header>

      {flows.map((flow) => (
        <section key={flow.id} className="flex flex-col gap-3">
          <h2 className="type-overline text-text-secondary">
            {flow.id} · {flow.title}
          </h2>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {flow.screens.map((s) => (
              <li key={s.id}>
                <Link
                  href={href(s.id)}
                  className="flex items-center justify-between rounded-md bg-surface-card px-4 py-3 type-body-m transition-colors hover:bg-surface-subtle"
                >
                  <span>{s.name}</span>
                  <span className="type-caption text-text-secondary">/s/{s.id}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
