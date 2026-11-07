"use client";

import React, { useState } from "react";
import { Navbar, ActiveTab } from "@/components/Navbar";
import { PersonaCard } from "@/components/PersonaCard";
import { JourneyVisualizer } from "@/components/JourneyVisualizer";
import { PainPointsMatrixComponent } from "@/components/PainPointsMatrix";
import { AntiPersonaStudio } from "@/components/AntiPersonaStudio";
import { ChatInterface } from "@/components/ChatInterface";
import { personas, journeys, painPointsMatrix, getPersonaById } from "@/lib/data";
import {
  Shield,
  Sparkles,
  BookOpen,
  Compass,
  AlertTriangle,
  Users,
  Zap,
  Clock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("personas");
  const [chatPersonaTarget, setChatPersonaTarget] = useState<string>("tiago");

  const mariaPersona = getPersonaById("maria")!;

  const handleOpenChatWithPersona = (personaId: string) => {
    setChatPersonaTarget(personaId);
    setActiveTab("chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Project Context Hero Banner */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950">
                Pulso Micro-Seguros
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-teal-300 border border-slate-700">
                Padrões NN/g (Nielsen Norman Group)
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                Desk Research Portugal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Modelador de Personas Sintéticas & Jornada do Consumidor
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>Pulso:</strong> Microsseguro de acidentes pessoais sob demanda para atividades desportivas ao ar livre (surf, corrida, BTT, desporto adaptado). Ativado no telemóvel em <strong>menos de 1 minuto</strong>, com preço fixo por sessão, linguagem clara e sem burocracias ou anuidades.
            </p>

            {/* NOVO: Como Funciona o Pulso em 3 Passos */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Como Funciona a Experiência Pulso em 3 Passos:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-xs text-white block">Atividade & Local</strong>
                    <span className="text-[11px] text-slate-300">
                      Indica o que vai fazer (ex: Surf na Ericeira ou BTT no Gerês).
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-xs text-white block">Duração & Preço Fixo</strong>
                    <span className="text-[11px] text-slate-300">
                      Escolhe 3h, tarde ou fim de semana (ex: 2,90€ fixos, sem anuidade).
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-xs text-white block">Ativação em &lt; 60s</strong>
                    <span className="text-[11px] text-slate-300">
                      1 toque com MB Way / Apple Pay. Apólice ativa e expira no fim da sessão.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-slate-300">Personas Alvo:</span>
                <strong className="text-white">Tiago (Core), Rita & Joana</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-slate-300">Anti-Persona:</span>
                <strong className="text-rose-300">Maria (64a, Sintra)</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-slate-300">Chat Interativo:</span>
                <strong className="text-teal-300">Multi-Fornecedor & Mock</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Views */}
        {activeTab === "personas" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Perfis de Personas (Padrões NN/g)
                </h2>
                <p className="text-xs text-slate-500">
                  Explore os cartões detalhados ou utilize o comparador lado a lado para analisar a segmentação das 4 personas.
                </p>
              </div>
            </div>
            <PersonaCard
              personas={personas}
              onSelectForChat={handleOpenChatWithPersona}
            />
          </section>
        )}

        {activeTab === "journeys" && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Jornadas do Consumidor com Curva Emocional (NN/g)
              </h2>
              <p className="text-xs text-slate-500">
                Mapeamento passo a passo com gráfico de sentimento: Gatilho, Descoberta, Ativação em &lt;60s, Durante a Sessão e Pós-Sessão.
              </p>
            </div>
            <JourneyVisualizer journeys={journeys} initialPersonaId={chatPersonaTarget} />
          </section>
        )}

        {activeTab === "matrix" && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Matriz de Dores e Oportunidades de Produto
              </h2>
              <p className="text-xs text-slate-500">
                Análise comparativa entre os problemas crónicos dos seguros tradicionais em Portugal e os requisitos de design do Pulso.
              </p>
            </div>
            <PainPointsMatrixComponent matrix={painPointsMatrix} />
          </section>
        )}

        {activeTab === "antipersona" && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Anti-Persona Studio: Definição de Fronteira do Produto
              </h2>
              <p className="text-xs text-slate-500">
                Estudo de caso da Maria (64 anos, Sintra), simulador interativo de screener e design de saída graciosa (*Graceful Off-Ramp*).
              </p>
            </div>
            <AntiPersonaStudio
              antiPersona={mariaPersona}
              onOpenChatWithAntiPersona={() => handleOpenChatWithPersona("maria")}
              onOpenChatWithAnalyst={() => handleOpenChatWithPersona("analyst")}
            />
          </section>
        )}

        {activeTab === "chat" && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Chat Interativo com as Personas & Analista UX
              </h2>
              <p className="text-xs text-slate-500">
                Converse diretamente com o Tiago, a Rita, a Joana, a anti-persona Maria ou com o Especialista UX para testar mensagens e entender os porquês.
              </p>
            </div>
            <ChatInterface initialPersonaId={chatPersonaTarget} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 space-y-1">
        <p>
          <strong>Projeto Pulso</strong> — Investigação de Utilizadores & Personas Sintéticas segundo normas NN/g.
        </p>
        <p className="text-[11px] text-slate-400">
          Artefactos guardados em formato Markdown em <code>artifacts/</code> e dados em <code>data/</code> para backup no GitHub.
        </p>
      </footer>
    </div>
  );
}
