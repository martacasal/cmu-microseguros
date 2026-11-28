import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

/** Titles font (GCMOX, demo) — used in addition to Geist, never instead of it. */
const gcmox = localFont({
  variable: "--font-title",
  src: [
    { path: "../fonts/GCMOXDemo-Thin.ttf", weight: "100" },
    { path: "../fonts/GCMOXDemo-ExtraLight.ttf", weight: "200" },
    { path: "../fonts/GCMOXDemo-Light.ttf", weight: "300" },
    { path: "../fonts/GCMOXDemo-Regular.ttf", weight: "400" },
    { path: "../fonts/GCMOXDemo-Medium.ttf", weight: "500" },
    { path: "../fonts/GCMOXDemo-SemiBold.ttf", weight: "600" },
    { path: "../fonts/GCMOXDemo-Bold.ttf", weight: "700" },
    { path: "../fonts/GCMOXDemo-ExtraBold.ttf", weight: "800" },
  ],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable, gcmox.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="light" enableSystem={false}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
