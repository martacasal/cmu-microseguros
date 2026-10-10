"use client";

import React, { useState } from "react";
import { Persona } from "@/types";
import { ShieldAlert, AlertOctagon, ArrowRight, UserX, HelpCircle, HeartHandshake, CheckCircle } from "lucide-react";

interface AntiPersonaStudioProps {
  antiPersona: Persona;
  onOpenChatWithAntiPersona: () => void;
  onOpenChatWithAnalyst: () => void;
}

export const AntiPersonaStudio: React.FC<AntiPersonaStudioProps> = ({
  antiPersona,
  onOpenChatWithAntiPersona,
  onOpenChatWithAnalyst,
}) => {
  const [showOffRampDemo, setShowOffRampDemo] = useState(false);

  return (
    <div className="space-y-6">
      {/* Introduction Banner: The Power of Anti-Personas (NN/g) */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-sm">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] tracking-wider uppercase">
              Normas NN/g
            </span>
            <span className="text-teal-400 font-semibold text-xs uppercase tracking-wider">
              Análise de Fronteira e Exclusão Estratégica
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Anti-Persona Studio: {antiPersona.name} ({antiPersona.age} anos, Sintra)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Segundo a Nielsen Norman Group, uma <strong>anti-persona</strong> é o antídoto essencial contra o erro fatal de "tentar desenhar um produto para toda a gente". A Maria permite à equipa do Pulso definir limites firmes de negócio, proteger a margem financeira e conceber um mecanismo respeitoso de saída graciosa (<em>graceful off-ramp</em>).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenChatWithAntiPersona}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
            >
              <span>Interagir com a Maria</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenChatWithAnalyst}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Perguntar ao Investigador UX</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* The 4 Disqualifiers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h4 className="font-bold text-sm text-slate-900">Critério de Idade</h4>
          <p className="text-xs text-slate-600">
            64 anos (fora da janela de inclusão dos 18–40 anos onde se concentra o desporto individual outdoor).
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h4 className="font-bold text-sm text-slate-900">Risco Atuarial Grave</h4>
          <p className="text-xs text-slate-600">
            Quedas em 60+ anos têm risco elevado de fraturas de fémur e internamento prolongado incompatível com apólice de 2€.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Custo de Suporte Invertido</h4>
          <p className="text-xs text-slate-600">
            Exige apoio humano por telefone (5€ a 15€/chamada), consumindo 5x o valor total de uma microapólice.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Rejeição de Checkout</h4>
          <p className="text-xs text-slate-600">
            Aversão categórica a MB Way e Apple Pay sem papel timbrado e carimbo de agência bancária física.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison: What happens if we try to serve Maria? */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-600" />
          O Que Aconteceria se o Pulso Tentasse Adaptar o Produto à Maria?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              ❌ Consequências Destrutivas para o Negócio
            </h4>
            <ul className="space-y-2 text-xs text-rose-950">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>O fluxo de ativação passaria de 45 segundos para 15 minutos de leitura jurídica lenta.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Seria obrigatório contratar uma central de call center 24h, duplicando os custos operacionais.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Tiago e Joana abandonariam a aplicação por excesso de atrito e formulários burocráticos.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-teal-50 border border-teal-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
              ✅ A Decisão de Design Correta (Norma NN/g)
            </h4>
            <ul className="space-y-2 text-xs text-teal-950">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Aplicar um <strong>screener de idade preventivo</strong> no início da jornada.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Explicar com respeito e transparência o foco em desporto jovem pontual.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Recomendar seguros anuais convencionais seniores (Fidelidade, Tranquilidade) com apoio presencial.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Graceful Off-Ramp Simulation */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Simulação do Ecrã de "Saída Graciosa" (Graceful Off-Ramp)
              </h4>
              <p className="text-xs text-slate-500">
                Veja como o Pulso comunica a recusa no ecrã de onboarding sem ofender o utilizador sénior.
              </p>
            </div>
            <button
              onClick={() => setShowOffRampDemo(!showOffRampDemo)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {showOffRampDemo ? "Ocultar Exemplo" : "Ver Exemplo de Ecrã"}
            </button>
          </div>

          {showOffRampDemo && (
            <div className="max-w-md mx-auto bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h5 className="font-bold text-base text-white">
                  Obrigado pelo seu interesse no Pulso
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A aplicação Pulso foi especificamente concebida para sessões desportivas pontuais de curta duração para desportistas entre os 18 e os 40 anos.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-teal-400">
                  A nossa recomendação de segurança para caminhadas regulares:
                </p>
                <p>
                  Para caminhadas de grupo e proteção contínua sem limite de idade, recomendamos consultar o seu balcão bancário habitual ou uma apólice de acidentes pessoais sénior com acompanhamento presencial personalizado.
                </p>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-400 transition-all">
                Conhecer Seguros Tradicionais Recomendados
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
