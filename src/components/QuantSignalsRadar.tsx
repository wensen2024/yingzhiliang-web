"use client";

import React, { useState } from "react";
import { Activity, TrendingUp, TrendingDown, Zap, Lock, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { QuantSignal } from "@/lib/site-data";

interface QuantSignalsRadarProps {
  signals: QuantSignal[];
  onUnlockVip: () => void;
}

export function QuantSignalsRadar({ signals, onUnlockVip }: QuantSignalsRadarProps) {
  const [selectedMarket, setSelectedMarket] = useState<string>("ALL");
  const { t } = useI18n();

  const filteredSignals = signals.filter((s) => {
    if (selectedMarket === "ALL") return true;
    return s.market.toUpperCase() === selectedMarket.toUpperCase();
  });

  const tabs = [
    { id: "ALL", label: t("sig.tabAll") },
    { id: "Crypto", label: t("sig.tabCrypto") },
    { id: "A-Share", label: t("sig.tabAshare") },
    { id: "US-Stock", label: t("sig.tabUsstock") },
    { id: "Commodity", label: t("sig.tabCommodity") },
  ];

  const directionLabel = (direction: string) => {
    if (direction === "STRONG_BUY") return t("sig.strongBuy");
    if (direction === "BUY") return t("sig.buy");
    return t("sig.short");
  };

  return (
    <section id="quant-radar" className="py-16 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>{t("sig.pill")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("sig.title")}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {t("sig.subtitle")}
            </p>
          </div>

          {/* Market filter tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedMarket(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedMarket === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSignals.map((signal) => {
            const isBuy = signal.direction.includes("BUY");
            const isStrongBuy = signal.direction === "STRONG_BUY";

            return (
              <div
                key={signal.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 flex flex-col justify-between hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden"
              >
                {signal.isVipOnly && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {t("sig.vipBadge")}
                    </div>
                  </div>
                )}

                <div>
                  {/* Top Symbol & Direction Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-white tracking-tight">
                        {signal.symbol}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {signal.timeframe}
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                        isStrongBuy
                          ? "bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30"
                          : isBuy
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {isBuy ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>{directionLabel(signal.direction)}</span>
                    </div>
                  </div>

                  {/* Strategy Name */}
                  <div className="text-xs font-semibold text-blue-400 mb-3 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{t(`signals.${signal.id}.strategy`)}</span>
                  </div>

                  {/* Pricing Levels Matrix */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-3 text-center">
                    <div>
                      <div className="text-[10px] text-slate-400">{t("sig.entry")}</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5">
                        {signal.entryPrice}
                      </div>
                    </div>
                    <div className="border-x border-slate-800">
                      <div className="text-[10px] text-emerald-400 font-semibold">{t("sig.target")}</div>
                      <div className="text-xs sm:text-sm font-mono font-black text-emerald-400 mt-0.5">
                        {signal.targetPrice}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-red-400">{t("sig.stop")}</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-red-400 mt-0.5">
                        {signal.stopLossPrice}
                      </div>
                    </div>
                  </div>

                  {/* Win Rate & Profit Factor Badges */}
                  <div className="flex items-center justify-between text-xs mb-3 px-1">
                    <div className="flex items-center gap-1 text-slate-300">
                      <span className="text-slate-400 text-[11px]">{t("sig.winRate")}</span>
                      <span className="font-extrabold text-amber-400 font-mono">
                        {signal.winRate}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <span className="text-slate-400 text-[11px]">{t("sig.pf")}</span>
                      <span className="font-extrabold text-emerald-400 font-mono">
                        {signal.profitFactor} : 1
                      </span>
                    </div>
                  </div>

                  {/* Rationale text or VIP blur */}
                  {signal.isVipOnly ? (
                    <div className="relative p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 text-xs">
                      <div className="filter blur-sm select-none text-slate-400">
                        {t("sig.vipBlur")}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={onUnlockVip}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{t("sig.unlock")}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="text-slate-400 font-medium">{t("sig.logic")}</span>
                      {t(`signals.${signal.id}.rationale`)}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t("sig.active")}
                  </span>
                  <span className="text-slate-500">
                    {t("sig.dept")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
