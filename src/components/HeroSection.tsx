"use client";

import React from "react";
import { Zap, ArrowRight, CheckCircle2, Flame, DollarSign, Wallet } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface HeroSectionProps {
  onOpenPaymentHub: () => void;
  todayRevenue: number;
  dailyTarget: number;
}

export function HeroSection({ onOpenPaymentHub, todayRevenue, dailyTarget }: HeroSectionProps) {
  const { t } = useI18n();
  const percent = Math.min(Math.round((todayRevenue / dailyTarget) * 100), 999);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[400px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{t("hero.pill1")}</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-amber-400 font-bold">{t("hero.pill2")}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-6">
            {t("hero.titleTop")}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              {t("hero.titleGradient")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#products-store"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>{t("hero.ctaPrimary")}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenPaymentHub}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-blue-500/40 text-blue-300 hover:text-white font-bold text-base shadow-lg shadow-blue-500/10 hover:border-blue-400 transition-all cursor-pointer"
            >
              <Wallet className="w-5 h-5 text-blue-400" />
              <span>{t("hero.ctaSecondary")}</span>
            </button>
          </div>

          {/* Live Progress Card in Hero */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {t("hero.progressTitle")}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                    <span>¥{todayRevenue.toFixed(2)}</span>
                    <span className="text-xs font-normal text-slate-400">
                      {t("hero.baseLine", { target: dailyTarget })}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {percent >= 100 ? t("hero.targetMet") : t("hero.rushing")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <div className="text-xs text-slate-400">{t("hero.todayRate")}</div>
                  <div className="text-xl font-black text-amber-400">{percent}%</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-right">
                  <div className="text-xs text-slate-400">{t("hero.monthlyProjected")}</div>
                  <div className="text-xl font-black text-emerald-400">
                    ¥{(todayRevenue * 30).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-3.5 p-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-700 relative shadow-sm"
                style={{ width: `${Math.min(percent, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("hero.alipayCheck")}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("hero.ethCheck")}
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> {t("hero.btcCheck")}
              </span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/60">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-black text-white">84.5%</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.stat1Label")}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-black text-amber-400">3.2 : 1</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.stat2Label")}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">¥1,000+</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.stat3Label")}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="text-2xl font-black text-blue-400">{t("hero.stat4Value")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.stat4Label")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
