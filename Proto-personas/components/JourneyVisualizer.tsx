"use client";

import React, { useState } from "react";
import { CustomerJourney } from "@/types";
import {
  Compass,
  Lightbulb,
  AlertCircle,
  MessageCircle,
  MapPin,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Download,
  Copy,
  Check,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

interface JourneyVisualizerProps {
  journeys: Record<string, CustomerJourney>;
  initialPersonaId?: string;
}

export const JourneyVisualizer: React.FC<JourneyVisualizerProps> = ({
  journeys,
  initialPersonaId = "tiago",
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(initialPersonaId);
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const journey = journeys[selectedPersonaId] || journeys["tiago"];
  const currentStage =
    journey.stages.find((s) => s.stageNumber === activeStageNumber) ||
    journey.stages[0];

  const personaMeta: Record<
    string,
    { name: string; role: string; avatar: string; color: string }
  > = {
    tiago: { name: "Tiago Ferreira", role: "Surfista Urbano", avatar: "🏄‍♂️", color: "teal" },
    rita: { name: "Rita Magalhães", role: "Mãe BTTista", avatar: "🚵‍♀️", color: "indigo" },
    joana: { name: "Joana Vasconcelos", role: "Atleta Adaptada", avatar: "🧑‍🦽", color: "cyan" },
    maria: { name: "Maria do Carmo Santos", role: "Anti-Persona (Fricção)", avatar: "👵", color: "rose" },
  };

  // Mapeamento da curva emocional por persona e estágio (-2 a +2)
  const sentimentScores: Record<string, number[]> = {
    tiago: [0.5, -0.6, 1.8, 2.0, 1.9],
    rita: [-0.8, 0.4, 1.6, 1.8, 1.9],
    joana: [-1.2, 1.2, 2.0, 2.0, 1.8],
    maria: [-0.6, -1.8, -2.0, 0.8, 1.5],
  };

  const scores = sentimentScores[selectedPersonaId] || [0, 0, 0, 0, 0];

  const handleCopyMarkdown = () => {
    let md = `# Jornada do Consumidor: ${journey.personaName}\n\n`;
    md += `**Cenário:** ${journey.scenario}\n\n`;
    journey.stages.forEach((s) => {
      md += `## Fase ${s.stageNumber}: ${s.stageName}\n`;
      md += `- **Objetivo:** ${s.userGoal}\n`;
      md += `- **Pensamento:** "${s.thoughts}"\n`;
      md += `- **Emoção:** ${s.emotions}\n`;
      md += `- **Ações:** ${s.userActions.join("; ")}\n`;
      md += `- **Touchpoints:** ${s.touchpoints.join(", ")}\n`;
      md += `- **Dores:** ${s.painPoints.join("; ")}\n`;
      md += `- **Oportunidades:** ${s.opportunities.join("; ")}\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    let md = `# Jornada do Consumidor: ${journey.personaName}\n\n`;
    md += `**Cenário:** ${journey.scenario}\n\n`;
    journey.stages.forEach((s) => {
      md += `## Fase ${s.stageNumber}: ${s.stageName}\n`;
      md += `- **Objetivo:** ${s.userGoal}\n`;
      md += `- **Pensamento:** "${s.thoughts}"\n`;
      md += `- **Emoção:** ${s.emotions}\n`;
      md += `- **Ações:** ${s.userActions.join("; ")}\n`;
      md += `- **Touchpoints:** ${s.touchpoints.join(", ")}\n`;
      md += `- **Dores:** ${s.painPoints.join("; ")}\n`;
      md += `- **Oportunidades:** ${s.opportunities.join("; ")}\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jornada_${selectedPersonaId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Persona Journey Switcher & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            Jornada de:
          </span>
          {Object.entries(personaMeta).map(([id, meta]) => {
            const isSelected = id === selectedPersonaId;
            return (
              <button
                key={id}
                onClick={() => {
                  setSelectedPersonaId(id);
                  setActiveStageNumber(1);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-md ring-2 ring-teal-500/50"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{meta.avatar}</span>
                <span>{meta.name.split(" ")[0]}</span>
                <span className="text-xs font-normal text-slate-400">({meta.role})</span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar .md</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Descarregar .md</span>
          </button>
        </div>
      </div>

      {/* Scenario Overview */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Cenário do Consumidor
          </span>
          <h3 className="text-base font-bold text-slate-900">{journey.scenario}</h3>
        </div>
      </div>

      {/* NOVO: Curva Emocional Interativa (Padrão de Ouro NN/g) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Curva Emocional ao Longo da Experiência (NN/g Sentiment Curve)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            Altos e baixos emocionais em cada fase da jornada
          </span>
        </div>

        {/* Visual Emotional Curve Timeline */}
        <div className="pt-2 pb-1 relative">
          {/* Baseline reference */}
          <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-200 pointer-events-none" />

          <div className="grid grid-cols-5 gap-2 relative z-10">
            {journey.stages.map((st, i) => {
              const score = scores[i] || 0;
              const isSelected = st.stageNumber === activeStageNumber;

              let sentimentColor = "bg-teal-500 text-white";
              let sentimentBg = "bg-teal-50 border-teal-200";
              let SentimentIcon = Smile;

              if (score < -0.5) {
                sentimentColor = "bg-rose-500 text-white";
                sentimentBg = "bg-rose-50 border-rose-200";
                SentimentIcon = Frown;
              } else if (score >= -0.5 && score <= 0.8) {
                sentimentColor = "bg-amber-500 text-white";
                sentimentBg = "bg-amber-50 border-amber-200";
                SentimentIcon = Meh;
              }

              return (
                <button
                  key={st.stageNumber}
                  onClick={() => setActiveStageNumber(st.stageNumber)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[110px] ${
                    isSelected
                      ? "ring-2 ring-teal-500 shadow-md " + sentimentBg
                      : "bg-slate-50 hover:bg-white border-slate-200"
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">
                    Fase {st.stageNumber}
                  </span>

                  <div className="my-1 flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${sentimentColor}`}
                    >
                      <SentimentIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 mt-1 line-clamp-1">
                      {st.emotions.split(",")[0]}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                      score > 0
                        ? "text-emerald-700 bg-emerald-100"
                        : score < 0
                        ? "text-rose-700 bg-rose-100"
                        : "text-slate-600 bg-slate-200"
                    }`}
                  >
                    {score > 0 ? `+${score}` : score} pts
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5 Stages Interactive Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {journey.stages.map((stage) => {
          const isActive = stage.stageNumber === activeStageNumber;
          return (
            <button
              key={stage.stageNumber}
              onClick={() => setActiveStageNumber(stage.stageNumber)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-teal-500/50"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-teal-500 text-slate-950" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Fase {stage.stageNumber}
                </span>
                {isActive && <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />}
              </div>
              <p className="text-xs font-bold truncate">
                {stage.stageName.split(". ")[1] || stage.stageName}
              </p>
            </button>
          );
        })}
      </div>

      {/* Current Stage Deep Dive Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-extrabold">
                Fase {currentStage.stageNumber} de 5
              </span>
              <h2 className="text-xl font-bold text-slate-900">{currentStage.stageName}</h2>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Objetivo do Utilizador:</strong> {currentStage.userGoal}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Estado Emocional:</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {currentStage.emotions}
            </span>
          </div>
        </div>

        {/* User Thoughts & Speech Bubble */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              O que passa pela mente do utilizador (Mindset & Citação)
            </span>
            <p className="text-sm font-serif italic text-slate-800">{currentStage.thoughts}</p>
          </div>
        </div>

        {/* User Actions & Touchpoints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              Ações Concretas do Utilizador
            </h4>
            <ul className="space-y-2">
              {currentStage.userActions.map((action, i) => (
                <li
                  key={i}
                  className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              Touchpoints (Pontos de Contacto)
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentStage.touchpoints.map((tp, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200"
                >
                  {tp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pain Points vs Pulso Opportunities at this Stage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="bg-rose-50/50 border border-rose-200/60 p-5 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Dores & Fricções nesta Fase
            </h4>
            <ul className="space-y-2 text-xs text-rose-950">
              {currentStage.painPoints.map((pain, i) => (
                <li key={i} className="bg-white/80 p-2.5 rounded-md border border-rose-200/50">
                  {pain}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-teal-50/50 border border-teal-200/60 p-5 rounded-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-teal-600" />
              Oportunidades de Produto Pulso
            </h4>
            <ul className="space-y-2 text-xs text-teal-950">
              {currentStage.opportunities.map((opp, i) => (
                <li key={i} className="bg-white/80 p-2.5 rounded-md border border-teal-200/50">
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
