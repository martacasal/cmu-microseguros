"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, Sparkles, AlertCircle, Info } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  senderName: string;
  avatar: string;
  provider?: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  initialPersonaId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialPersonaId = "tiago",
}) => {
  const [activePersonaId, setActivePersonaId] = useState<string>(initialPersonaId);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    tiago: [
      {
        id: "t-init",
        role: "assistant",
        content:
          "Boas! Sou o Tiago. Corro em Lisboa e surfo na Ericeira quando o mar está bom. Podes perguntar-me qualquer coisa sobre como decido as minhas idas ao mar, o que acho de seguros tradicionais ou quanto estaria disposto a pagar no Pulso.",
        senderName: "Tiago Ferreira",
        avatar: "🏄‍♂️",
        timestamp: "Agora",
      },
    ],
    rita: [
      {
        id: "r-init",
        role: "assistant",
        content:
          "Olá! Sou a Rita. Sou arquiteta em Braga e faço BTT na serra aos sábados com o meu filho Martim. Estou aqui para partilhar como planeio as nossas saídas e quais são as minhas maiores preocupações em termos de resgate e proteção familiar.",
        senderName: "Rita Magalhães",
        avatar: "🚵‍♀️",
        timestamp: "Agora",
      },
    ],
    joana: [
      {
        id: "j-init",
        role: "assistant",
        content:
          "Olá! Chamo-me Joana. Sou designer de acessibilidade no Porto, utilizadora de cadeira de rodas e pratico handbike na marginal e canoagem no Douro. Podes perguntar-me sobre as barreiras que encontro nas seguradoras tradicionais e o que o Pulso precisa de garantir para ser autenticamente inclusivo.",
        senderName: "Joana Vasconcelos",
        avatar: "🧑‍🦽",
        timestamp: "Agora",
      },
    ],
    maria: [
      {
        id: "m-init",
        role: "assistant",
        content:
          "Boa tarde. Sou a Maria, tenho 64 anos e vivo em Sintra. Todos os sábados faço caminhadas com as minhas amigas na serra. Falaram-me de seguros no telemóvel, mas eu cá tenho muitas dúvidas sobre essas coisas automáticas sem balcão nem pessoas conhecidas.",
        senderName: "Maria do Carmo Santos (Anti-Persona)",
        avatar: "👵",
        timestamp: "Agora",
      },
    ],
    analyst: [
      {
        id: "a-init",
        role: "assistant",
        content:
          "Olá! Sou o Especialista de Investigação UX e Metodólogo do projeto Pulso. Posso esclarecer o raciocínio por trás de cada persona, os dados científicos da desk research (Eurobarómetro, DL 10/2009, EuroSafe), a metodologia NN/g ou a razão de exclusão da anti-persona Maria.",
        senderName: "Especialista UX & Metodólogo",
        avatar: "🔬",
        timestamp: "Agora",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personasList = [
    { id: "tiago", name: "Tiago", role: "Surfista (Target Core)", avatar: "🏄‍♂️" },
    { id: "rita", name: "Rita", role: "Mãe BTT (Familiar)", avatar: "🚵‍♀️" },
    { id: "joana", name: "Joana", role: "Atleta Adaptada (Inclusão)", avatar: "🧑‍🦽" },
    { id: "maria", name: "Maria", role: "Anti-Persona (Exclusão)", avatar: "👵" },
    { id: "analyst", name: "Especialista UX", role: "Metodologia & Dados", avatar: "🔬" },
  ];

  const suggestedPrompts: Record<string, string[]> = {
    tiago: [
      "Porque não queres um seguro anual de 25€ por mês?",
      "Com quanta antecedência decides ir surfar na Ericeira?",
      "Quanto aceitarias pagar por uma tarde de seguro no mar?",
      "O que te fez começar a pensar em ter seguro de acidentes?",
    ],
    rita: [
      "O que te preocupa mais quando levas o teu filho para o BTT?",
      "Porque preferes agendar o seguro na sexta-feira à noite?",
      "O seguro do teu ginásio não te cobre na serra?",
      "A cobertura de Responsabilidade Civil é importante para ti?",
    ],
    joana: [
      "Que barreiras encontraste nas seguradoras tradicionais?",
      "O que tem o Pulso de garantir para ser acessível no teu telemóvel?",
      "Porque recusas questionários sobre o teu histórico médico?",
      "Como percebes o risco de colisão durante os treinos de handbike?",
    ],
    maria: [
      "Porque tens receio de ativar um seguro no telemóvel?",
      "O que farias se sofreres uma queda na serra de Sintra?",
      "Que método de pagamento usas habitualmente?",
      "O que precisarias para confiar num serviço de seguros?",
    ],
    analyst: [
      "Porque é que a Maria foi definida como Anti-Persona?",
      "Quais são os dados comprovados vs hipóteses do Tiago?",
      "O que diz o Decreto-Lei n.º 10/2009 sobre seguro obrigatório?",
      "Como é que as normas da NN/g foram aplicadas neste projeto?",
    ],
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activePersonaId, isLoading]);

  const activeMessages = messages[activePersonaId] || [];
  const activePersonaMeta = personasList.find((p) => p.id === activePersonaId)!;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      senderName: "Investigador / Utilizador",
      avatar: "👤",
      timestamp: "Agora",
    };

    const currentHistory = [...activeMessages, userMsg];

    setMessages((prev) => ({
      ...prev,
      [activePersonaId]: currentHistory,
    }));

    setInputMessage("");
    setIsLoading(true);

    try {
      const payloadMessages = currentHistory.map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersonaId,
          messages: payloadMessages,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro na resposta do servidor: ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Sem resposta.",
        senderName: activePersonaMeta.name,
        avatar: activePersonaMeta.avatar,
        provider: data.provider,
        timestamp: "Agora",
      };

      setMessages((prev) => ({
        ...prev,
        [activePersonaId]: [...prev[activePersonaId], assistantMsg],
      }));
    } catch (error) {
      console.error("Erro no chat:", error);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Desculpe, ocorreu uma falha de comunicação com o serviço. Verifique a consola ou tente novamente.",
        senderName: "Sistema",
        avatar: "⚠️",
        timestamp: "Agora",
      };
      setMessages((prev) => ({
        ...prev,
        [activePersonaId]: [...prev[activePersonaId], errorMsg],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages((prev) => ({
      ...prev,
      [activePersonaId]: [prev[activePersonaId][0]],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[750px]">
      {/* Chat Header */}
      <div className="p-4 sm:px-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {activePersonaMeta.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">{activePersonaMeta.name}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {activePersonaMeta.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interação em Português (PT-PT) com suporte multi-fornecedor ou simulação local
            </p>
          </div>
        </div>

        {/* Persona Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {personasList.map((p) => {
            const isCurrent = p.id === activePersonaId;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersonaId(p.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <span>{p.avatar}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
          <button
            onClick={handleResetChat}
            title="Reiniciar esta conversa"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 ml-1 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Starter Prompts Pill Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-600" />
          Sugestões:
        </span>
        <div className="flex gap-2">
          {suggestedPrompts[activePersonaId]?.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-teal-500 hover:text-teal-700 text-slate-700 font-medium whitespace-nowrap text-xs transition-all shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
        {activeMessages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 shadow-2xs ${
                  isUser
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-base"
                }`}
              >
                {msg.avatar}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs text-sm ${
                  isUser
                    ? "bg-slate-900 text-white rounded-tr-xs"
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      isUser ? "text-teal-300" : "text-slate-500"
                    }`}
                  >
                    {msg.senderName}
                  </span>
                  {msg.provider && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-teal-50 text-teal-700 font-mono border border-teal-200">
                      {msg.provider}
                    </span>
                  )}
                </div>

                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-base shadow-2xs">
              {activePersonaMeta.avatar}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px] text-slate-400">
                {activePersonaMeta.name} está a escrever...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Faça uma pergunta a ${activePersonaMeta.name}...`}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 bg-slate-50 text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>Enviar</span>
            <Send className="w-4 h-4 text-teal-400" />
          </button>
        </form>
        <p className="text-[11px] text-slate-400 mt-2 text-center">
          💡 Dica: Pode configurar a sua chave da Gemini, OpenAI ou Claude no ficheiro <code>.env</code>, ou utilizar o simulador inteligente offline integrado.
        </p>
      </div>
    </div>
  );
};
