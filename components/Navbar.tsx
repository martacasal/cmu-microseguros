"use client";

import React from "react";
import { Users, Compass, AlertTriangle, ShieldCheck, MessageSquareCode } from "lucide-react";

export type ActiveTab = "personas" | "journeys" | "matrix" | "antipersona" | "chat";

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "personas" as ActiveTab, label: "Personas NN/g", icon: Users },
    { id: "journeys" as ActiveTab, label: "Jornadas do Consumidor", icon: Compass },
    { id: "matrix" as ActiveTab, label: "Dores & Oportunidades", icon: AlertTriangle },
    { id: "antipersona" as ActiveTab, label: "Anti-Persona Studio", icon: ShieldCheck },
    { id: "chat" as ActiveTab, label: "Chat com Personas", icon: MessageSquareCode, badge: "Interativo" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Pulso
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Microsseguro Sob Demanda
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Investigação de Consumo & Personas Sintéticas (Normas NN/g)
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-teal-400" : "text-slate-500"}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-teal-500 text-slate-950"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
