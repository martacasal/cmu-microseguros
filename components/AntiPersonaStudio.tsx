"use client";

import React, { useState } from "react";
import { Persona } from "@/types";
import {
  ShieldAlert,
  AlertOctagon,
  ArrowRight,
  UserX,
  HelpCircle,
  HeartHandshake,
  CheckCircle,
  Sparkles,
  RotateCcw,
  Check,
  X,
} from "lucide-react";

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

  // Estados do Simulador de Screener
  const [screenerAge, setScreenerAge] = useState<string>("64");
  const [screenerSport, setScreenerSport] = useState<string>("caminhada");
  const [screenerPayment, setScreenerPayment] = useState<string>("balcao");
  const [screenerResult, setScreenerResult] = useState<"fail" | "pass" | null>(null);

  const handleRunScreener = () => {
    const isAgeValid = parseInt(screenerAge) >= 18 && parseInt(screenerAge) <= 40;
    const isPaymentValid = screenerPayment === "mobile";
    const isSportValid = screenerSport !== "federado";

    if (isAgeValid && isPaymentValid && isSportValid) {
      setScreenerResult("pass");
    } else {
      setScreenerResult("fail");
    }
  };

  const handleFillMariaPreset = () => {
    setScreenerAge("64");
    setScreenerSport("caminhada");
    setScreenerPayment("balcao");
    setScreenerResult("fail");
  };

  const handleFillTiagoPreset = () => {
    setScreenerAge("31");
    setScreenerSport("surf");
    setScreenerPayment("mobile");
    setScreenerResult("pass");
  };

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

      {/* NOVO: Simulador Interativo de Screener de Qualificação */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-extrabold uppercase">
                Simulador Interativo
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Teste de Screener: Algoritmo de Triagem do Pulso
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Experimente preencher os critérios de triagem para ver como o sistema classifica o utilizador em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFillMariaPreset}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-800 transition-all"
            >
              Simular Maria (64a)
            </button>
            <button
              onClick={handleFillTiagoPreset}
              className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-200 text-xs font-semibold text-teal-800 transition-all"
            >
              Simular Tiago (31a)
            </button>
          </div>
        </div>

        {/* 3 Interactive Questions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1: Idade */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase block">
              1. Qual é a sua idade?
            </label>
            <select
              value={screenerAge}
              onChange={(e) => {
                setScreenerAge(e.target.value);
                setScreenerResult(null);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-teal-500"
            >
              <option value="16">Menos de 18 anos</option>
              <option value="31">18 a 40 anos (ex: 31 anos)</option>
              <option value="42">41 a 55 anos (ex: 42 anos)</option>
              <option value="64">Mais de 55 anos (ex: 64 anos)</option>
            </select>
            <span className="text-[10px] text-slate-400 block">
              Critério: 18 a 40 anos (foco desportivo v1)
            </span>
          </div>

          {/* Question 2: Prática Desportiva */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase block">
              2. Modalidade & Contexto
            </label>
            <select
              value={screenerSport}
              onChange={(e) => {
                setScreenerSport(e.target.value);
                setScreenerResult(null);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-teal-500"
            >
              <option value="surf">Desporto individual ao ar livre (Surf, Corrida, BTT)</option>
              <option value="caminhada">Caminhada recreativa lenta informal</option>
              <option value="ginasio">Apenas ginásio / espaço fechado</option>
              <option value="federado">Atleta federado em competição</option>
            </select>
            <span className="text-[10px] text-slate-400 block">
              Critério: Não federado e outdoor
            </span>
          </div>

          {/* Question 3: Pagamento & Gestão */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase block">
              3. Preferência de Contratação
            </label>
            <select
              value={screenerPayment}
              onChange={(e) => {
                setScreenerPayment(e.target.value);
                setScreenerResult(null);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:ring-2 focus:ring-teal-500"
            >
              <option value="mobile">100% digital na app (MB Way / Apple Pay em &lt; 60s)</option>
              <option value="balcao">Balcão físico com dinheiro ou talão de Multibanco</option>
            </select>
            <span className="text-[10px] text-slate-400 block">
              Critério: Checkout instantâneo móvel
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleRunScreener}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Processar Triagem no Algoritmo</span>
          </button>
        </div>

        {/* Dynamic Screener Result Output */}
        {screenerResult && (
          <div
            className={`p-5 rounded-xl border transition-all ${
              screenerResult === "pass"
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : "bg-rose-50 border-rose-300 text-rose-950"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  screenerResult === "pass"
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                {screenerResult === "pass" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">
                  {screenerResult === "pass"
                    ? "✅ Perfil Aprovado: Target Core do Pulso"
                    : "❌ Perfil Desqualificado: Encaminhado para Saída Graciosa (Off-Ramp)"}
                </h4>
                <p className="text-xs">
                  {screenerResult === "pass"
                    ? "Este perfil cumpre a janela etária (18–40), pratica atividade desportiva em espaço não institucional e aceita pagamentos instantâneos móveis. Segue para a simulação de 3 toques."
                    : "Este perfil aciona as barreiras de exclusão da Anti-Persona (idade superior a 40 anos ou exigência de pagamento analógico). A aplicação ativa imediatamente a mensagem empática de saída."}
                </p>
              </div>
            </div>
          </div>
        )}
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
