"use client";

import React from "react";
import { Zap, Award, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface MoneyMakerBlueprintProps {
  onOpenPaymentHub: () => void;
  onOpenConsultation: () => void;
}

export function MoneyMakerBlueprint({ onOpenPaymentHub, onOpenConsultation }: MoneyMakerBlueprintProps) {
  const { t } = useI18n();

  return (
    <section id="master-blueprint" className="py-16 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t("bp.pill")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("bp.title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t("bp.subtitle")}
          </p>
        </div>

        {/* 3-Step Money Engine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: The Math Equation */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {t("bp.c1Title")}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t("bp.c1Desc")}
            </p>

            <div className="space-y-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>{t("bp.c1Row1")}</span>
                <span className="font-mono text-emerald-400 font-bold">+¥199.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{t("bp.c1Row2")}</span>
                <span className="font-mono text-emerald-400 font-bold">+¥598.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>{t("bp.c1Row3")}</span>
                <span className="font-mono text-emerald-400 font-bold">+¥349.50</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-center font-bold">
                <span className="text-white">{t("bp.c1Total")}</span>
                <span className="text-amber-400 font-mono text-sm">{t("bp.c1TotalValue")}</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3">
              {t("bp.c1Note")}
            </div>
          </div>

          {/* Card 2: The Traffic & Conversion System */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-lg relative">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {t("bp.c2Title")}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t("bp.c2Desc")}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>{t("bp.c2Item1Lead")}</strong>
                  {t("bp.c2Item1")}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>{t("bp.c2Item2Lead")}</strong>
                  {t("bp.c2Item2")}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>{t("bp.c2Item3Lead")}</strong>
                  {t("bp.c2Item3")}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: 35% Viral Affiliate Engine */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-lg relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {t("bp.c3Title")}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t("bp.c3Desc")}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="font-semibold text-amber-300 mb-1">{t("bp.c3CalcTitle")}</div>
                <div>{t("bp.c3Calc1")}</div>
                <div>{t("bp.c3Calc2")}</div>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                {t("bp.c3Note")}
              </div>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>{t("bp.bannerPill")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t("bp.bannerTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {t("bp.bannerDesc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              {t("bp.bannerBtn1")}
            </button>
            <button
              onClick={onOpenPaymentHub}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              {t("bp.bannerBtn2")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
