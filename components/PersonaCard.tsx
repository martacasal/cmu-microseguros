"use client";

import React, { useState } from "react";
import { Persona } from "@/types";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Smartphone,
  Shield,
  FileQuestion,
  HelpCircle,
  Activity as ActivityIcon,
  Layers,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";

interface PersonaCardProps {
  personas: Persona[];
  onSelectForChat?: (personaId: string) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({
  personas,
  onSelectForChat,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(
    personas[0]?.id || "tiago"
  );
  const [activeSubTab, setActiveSubTab] = useState<
    "overview" | "habits" | "activities" | "insurance" | "pains_goals" | "research"
  >("overview");

  const persona =
    personas.find((p) => p.id === selectedPersonaId) || personas[0];

  const typeBadgeColors = {
    target: "bg-teal-100 text-teal-800 border-teal-300",
    secondary: "bg-indigo-100 text-indigo-800 border-indigo-300",
    "anti-persona": "bg-rose-100 text-rose-800 border-rose-300",
  };

  const typeLabels = {
    target: "Persona Alvo Primária",
    secondary: "Persona Secundária",
    "anti-persona": "ANTI-PERSONA (Exclusão)",
  };

  return (
    <div className="space-y-6">
      {/* Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          Selecionar Perfil:
        </span>
        {personas.map((p) => {
          const isSelected = p.id === selectedPersonaId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPersonaId(p.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                isSelected
                  ? "bg-slate-900 text-white shadow-md ring-2 ring-teal-500/50"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className="text-base">{p.avatar}</span>
              <span>{p.name.split(" ")[0]}</span>
              <span
                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
                  p.type === "anti-persona"
                    ? "bg-rose-500 text-white"
                    : isSelected
                    ? "bg-slate-800 text-teal-300"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {p.type === "anti-persona" ? "Anti" : p.age + "a"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Persona Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-4xl shadow-inner shrink-0">
                {persona.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {persona.name}
                  </h2>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      typeBadgeColors[persona.type]
                    }`}
                  >
                    {typeLabels[persona.type]}
                  </span>
                </div>
                <p className="text-teal-400 font-medium text-sm">
                  {persona.archetype}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    {persona.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                    {persona.occupation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    {persona.age} anos
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action for Chat */}
            {onSelectForChat && (
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onSelectForChat(persona.id)}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <span>Conversar com {persona.name.split(" ")[0]}</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>

          {/* Persona Core Quote (NN/g Motto) */}
          <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
            <p className="text-slate-200 text-sm italic font-serif leading-relaxed">
              {persona.quote}
            </p>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 sm:px-6">
          {[
            { id: "overview", label: "1. Visão Geral & Bio" },
            { id: "habits", label: "2. Hábitos de Consumo" },
            { id: "activities", label: "3. Desportos & Risco" },
            { id: "insurance", label: "4. Seguros & Barreiras" },
            { id: "pains_goals", label: "5. Dores & Objetivos" },
            { id: "research", label: "6. Metodologia NN/g & Dados" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${
                activeSubTab === tab.id
                  ? "border-teal-500 text-teal-700 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeSubTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Narrativa Biográfica
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {persona.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold uppercase">Escolaridade</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {persona.demographics.education}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold uppercase">Rendimento</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {persona.demographics.incomeLevel}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Smartphone className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold uppercase">Literacia Digital</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {persona.demographics.techComfort}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold uppercase">Dispositivos Chave</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    {persona.demographics.primaryDevices.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONSUMPTION HABITS */}
          {activeSubTab === "habits" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    Gatilho & Tempo de Decisão
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Momento de Gatilho:</span>
                      <p className="font-semibold text-slate-800">{persona.consumptionHabits.decisionTrigger}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Antecedência da Decisão:</span>
                      <p className="font-semibold text-teal-700">{persona.consumptionHabits.decisionLeadTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-teal-600" />
                    Pagamentos & Atitude Face ao Gasto
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Métodos Preferidos:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {persona.consumptionHabits.preferredPaymentMethods.map((m, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Relação com Preço:</span>
                      <p className="text-xs text-slate-700 mt-1">{persona.consumptionHabits.spendingAttitude}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Aplicações e Serviços Digitais no Quotidiano
                </h4>
                <div className="flex flex-wrap gap-2">
                  {persona.consumptionHabits.digitalServicesUsed.map((app, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITIES & RISK */}
          {activeSubTab === "activities" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {persona.activities.map((act, i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <ActivityIcon className="w-4 h-4 text-teal-600" />
                        {act.name}
                      </h4>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        act.riskLevel >= 4
                          ? "bg-rose-100 text-rose-800"
                          : act.riskLevel === 3
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}>
                        Nível de Risco: {act.riskLevel}/4
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong className="text-slate-700">Frequência:</strong> {act.frequency}</p>
                      <p><strong className="text-slate-700">Ambiente:</strong> {act.environment}</p>
                      <p className="pt-1 text-slate-700">
                        <strong className="text-rose-700">Lesões Típicas:</strong> {act.commonInjuries}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INSURANCE ATTITUDES & BARRIERS */}
          {activeSubTab === "insurance" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    Proteção Atual que Detém
                  </h4>
                  <p className="text-sm text-slate-800">{persona.insuranceAttitude.currentProtection}</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    Equívoco / Falsa Suposição
                  </h4>
                  <p className="text-sm text-slate-800">{persona.insuranceAttitude.misconceptions}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Perceção Subjetiva de Risco
                  </h4>
                  <p className="text-sm text-slate-800">{persona.insuranceAttitude.perceivedRisk}</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 text-rose-600">
                    Barreira aos Seguros Tradicionais
                  </h4>
                  <p className="text-sm text-slate-800">{persona.insuranceAttitude.barrierToTraditionalInsurance}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAINS & GOALS */}
          {activeSubTab === "pains_goals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-rose-100 bg-rose-50/40 space-y-3">
                <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                  <span>❌</span> Dores e Frustrações Críticas (Pain Points)
                </h4>
                <ul className="space-y-2 text-xs text-rose-950">
                  {persona.painPoints.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-rose-200/60">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-teal-100 bg-teal-50/40 space-y-3">
                <h4 className="text-sm font-bold text-teal-900 uppercase tracking-wider flex items-center gap-2">
                  <span>🎯</span> Objetivos & Ganhos Esperados (Goals)
                </h4>
                <ul className="space-y-2 text-xs text-teal-950">
                  {persona.goalsAndMotivations.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-teal-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 6: RESEARCH FOUNDATION & SCREENER */}
          {activeSubTab === "research" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-indigo-900">
                    Adequação ao Produto Pulso (Pulso Fit)
                  </h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900">
                    Fit: {persona.pulsoFit.fitScore}
                  </span>
                </div>
                <p className="text-xs text-indigo-950 mb-3">{persona.pulsoFit.whyTheyBuyOrReject}</p>
                <div className="text-xs text-indigo-900 space-y-1">
                  <strong>Requisitos de Produto:</strong> {persona.pulsoFit.keyFeaturesNeeded.join(" • ")}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    ✅ Dados Comprovados (Fontes Externas)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {persona.researchFoundation.groundedFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    🧪 Hipóteses Testáveis (A Validar no Survey)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {persona.researchFoundation.hypothesesToValidate.map((hyp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">?</span>
                        <span>{hyp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <FileQuestion className="w-4 h-4 text-teal-600" />
                  Perguntas de Screener para Recrutamento de Participantes
                </h4>
                <div className="space-y-2">
                  {persona.researchFoundation.screenerQuestions.map((q, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800">
                      <strong>Q{i + 1}:</strong> {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
