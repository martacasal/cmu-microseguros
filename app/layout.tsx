import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulso — Personas Sintéticas & Consumer Journey (NN/g)",
  description:
    "Plataforma de modelação de personas, jornadas do consumidor e análise de anti-persona segundo padrões da Nielsen Norman Group para o projeto de microsseguro Pulso.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
