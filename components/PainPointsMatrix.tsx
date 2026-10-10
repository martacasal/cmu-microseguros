"use client";

import React from "react";
import { PainPointsMatrix } from "@/types";
import { AlertTriangle, Lightbulb, Users, CheckCircle, ShieldAlert } from "lucide-react";

interface PainPointsMatrixProps {
  matrix: PainPointsMatrix;
}

export const PainPointsMatrixComponent: React.FC<PainPointsMatrixProps> = ({ matrix }) => {
  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Matriz Estratégica
            </span>
            <h2 className="text-xl font-bold text-slate-900">{matrix.project}</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span>Metodologia:</span>
            <strong className="text-slate-800">{matrix.methodology}</strong>
          </div>
        </div>
        <p className="text-xs text-slate-600 max-w-3xl">
          Mapeamento comparativo entre as fricções crónicas da indústria seguradora tradicional em Portugal e os requisitos de produto desenhados para o Pulso.
        </p>
      </div>

      {/* Categories Cards */}
      <div className="space-y-6">
        {matrix.categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
          >
            {/* Category Header */}
            <div className="bg-slate-900 text-white p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                {cat.categoryName}
              </h3>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs text-slate-300 mr-1">Personas afetadas:</span>
                <div className="flex gap-1">
                  {cat.affectedPersonas.map((p, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        p === "maria"
                          ? "bg-rose-500 text-white"
                          : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Comparison Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pain Points */}
              <div className="bg-rose-50/50 border border-rose-200/60 p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Dores da Indústria Tradicional
                </h4>
                <ul className="space-y-2.5 text-xs text-rose-950">
                  {cat.painPoints.map((pain, i) => (
                    <li key={i} className="bg-white p-3 rounded-lg border border-rose-200/50 flex items-start gap-2 shadow-2xs">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-teal-50/50 border border-teal-200/60 p-5 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-teal-600" />
                  Solução & Oportunidade Pulso
                </h4>
                <ul className="space-y-2.5 text-xs text-teal-950">
                  {cat.opportunities.map((opp, i) => (
                    <li key={i} className="bg-white p-3 rounded-lg border border-teal-200/50 flex items-start gap-2 shadow-2xs">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
