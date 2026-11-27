import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { getScreen, screens } from "@/screens"

export function generateStaticParams() {
  return screens.map((s) => ({ id: s.id }))
}

export async function generateMetadata(props: PageProps<"/s/[id]">): Promise<Metadata> {
  const { id } = await props.params
  return { title: `${getScreen(id)?.name ?? "Screen"} · PULSE` }
}

export default async function ScreenPage(props: PageProps<"/s/[id]">) {
  const { id } = await props.params
  const screen = getScreen(id)
  if (!screen) notFound()
  const { Component } = screen
  return (
    <Component />
  )
}
