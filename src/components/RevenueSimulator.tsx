"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface RevenueSimulatorProps {
  onOpenPaymentHub: () => void;
}

export function RevenueSimulator({ onOpenPaymentHub }: RevenueSimulatorProps) {
  const { t } = useI18n();
  // Input parameters
  const [dailyVisitors, setDailyVisitors] = useState<number>(200);
  const [trialConversionRate, setTrialConversionRate] = useState<number>(10); // %
  const [monthlyVipConversionRate, setMonthlyVipConversionRate] = useState<number>(3); // %
  const [indicatorsPerWeek, setIndicatorsPerWeek] = useState<number>(4); // units/week
  const [consultationsPerMonth, setConsultationsPerMonth] = useState<number>(4); // orders/month

  // Calculations
  const trialOrdersPerDay = dailyVisitors * (trialConversionRate / 100);
  const trialDailyIncome = trialOrdersPerDay * 19.9;

  const vipOrdersPerDay = dailyVisitors * (monthlyVipConversionRate / 100);
  const vipDailyIncome = vipOrdersPerDay * 299;

  const indicatorDailyIncome = (indicatorsPerWeek * 699) / 7;
  const consultDailyIncome = (consultationsPerMonth * 999) / 30;

  const totalDailyRevenue = Math.round(trialDailyIncome + vipDailyIncome + indicatorDailyIncome + consultDailyIncome);
  const totalMonthlyRevenue = Math.round(totalDailyRevenue * 30);
  const totalAnnualRevenue = Math.round(totalDailyRevenue * 365);

  const target = 1000;
  const percent = Math.round((totalDailyRevenue / target) * 100);

  const applyPreset = (preset: "starter" | "mature" | "scale") => {
    if (preset === "starter") {
      setDailyVisitors(100);
      setTrialConversionRate(8);
      setMonthlyVipConversionRate(2);
      setIndicatorsPerWeek(3);
      setConsultationsPerMonth(2);
    } else if (preset === "mature") {
      setDailyVisitors(300);
      setTrialConversionRate(12);
      setMonthlyVipConversionRate(3.5);
      setIndicatorsPerWeek(7);
      setConsultationsPerMonth(5);
    } else {
      setDailyVisitors(800);
      setTrialConversionRate(15);
      setMonthlyVipConversionRate(5);
      setIndicatorsPerWeek(15);
      setConsultationsPerMonth(12);
    }
  };

  return (
    <section id="revenue-simulator" className="py-16 bg-slate-900/60 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t("sim.pill")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("sim.title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t("sim.subtitle")}
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              onClick={() => applyPreset("starter")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              {t("sim.presetStarter")}
            </button>
            <button
              onClick={() => applyPreset("mature")}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-colors cursor-pointer"
            >
              {t("sim.presetMature")}
            </button>
            <button
              onClick={() => applyPreset("scale")}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors cursor-pointer"
            >
              {t("sim.presetScale")}
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            {/* Slider 1: Daily Visitors */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">
                  {t("sim.visitors")}
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {dailyVisitors}
                  {t("sim.visitorsUnit")}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={dailyVisitors}
                onChange={(e) => setDailyVisitors(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                {t("sim.visitorsHint")}
              </div>
            </div>

            {/* Slider 2: Trial Conversion */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">
                  {t("sim.trial")}
                </span>
                <span className="font-mono font-bold text-blue-400 text-sm">
                  {trialConversionRate}
                  {t("sim.trialOrders", { orders: trialOrdersPerDay.toFixed(0) })}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={trialConversionRate}
                onChange={(e) => setTrialConversionRate(Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
              />
            </div>

            {/* Slider 3: Monthly VIP Conversion */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">
                  {t("sim.vip")}
                </span>
                <span className="font-mono font-bold text-purple-400 text-sm">
                  {monthlyVipConversionRate}
                  {t("sim.vipOrders", { orders: vipOrdersPerDay.toFixed(1) })}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={monthlyVipConversionRate}
                onChange={(e) => setMonthlyVipConversionRate(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Slider 4: Indicators per week */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">
                  {t("sim.indicator")}
                </span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {indicatorsPerWeek}
                  {t("sim.indicatorUnit", { daily: (indicatorsPerWeek / 7).toFixed(1) })}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={indicatorsPerWeek}
                onChange={(e) => setIndicatorsPerWeek(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Slider 5: 1on1 Consultations */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">
                  {t("sim.consult")}
                </span>
                <span className="font-mono font-bold text-teal-400 text-sm">
                  {consultationsPerMonth}
                  {t("sim.consultUnit")}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={consultationsPerMonth}
                onChange={(e) => setConsultationsPerMonth(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border-2 border-emerald-500/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-slate-400">
                {t("sim.resultTitle")}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                  percent >= 100
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300"
                }`}
              >
                {percent >= 100 ? t("sim.met", { percent }) : t("sim.notMet", { percent })}
              </span>
            </div>

            {/* Daily Revenue Highlight */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="text-xs text-slate-400">{t("sim.daily")}</div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1 flex items-baseline gap-2">
                <span className="text-emerald-400 font-mono">¥{totalDailyRevenue.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-normal">{t("sim.perDay")}</span>
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">
                {totalDailyRevenue >= 1000
                  ? t("sim.dailyMet", { diff: (totalDailyRevenue - 1000).toLocaleString() })
                  : t("sim.dailyDiff", { diff: (1000 - totalDailyRevenue).toLocaleString() })}
              </div>
            </div>

            {/* Monthly & Yearly Projections */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">{t("sim.monthly")}</div>
                <div className="text-xl font-black text-amber-400 mt-1 font-mono">
                  ¥{totalMonthlyRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{t("sim.monthlyNote")}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">{t("sim.yearly")}</div>
                <div className="text-xl font-black text-blue-400 mt-1 font-mono">
                  ¥{totalAnnualRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{t("sim.yearlyNote")}</div>
              </div>
            </div>

            {/* Breakdown detail */}
            <div className="text-xs space-y-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-300">
              <div className="flex justify-between">
                <span>{t("sim.contribTrial")}</span>
                <span className="font-mono text-slate-200">¥{Math.round(trialDailyIncome)} {t("sim.perDay")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("sim.contribVip")}</span>
                <span className="font-mono text-slate-200">¥{Math.round(vipDailyIncome)} {t("sim.perDay")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("sim.contribIndicator")}</span>
                <span className="font-mono text-slate-200">¥{Math.round(indicatorDailyIncome)} {t("sim.perDay")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("sim.contribConsult")}</span>
                <span className="font-mono text-slate-200">¥{Math.round(consultDailyIncome)} {t("sim.perDay")}</span>
              </div>
            </div>

            <button
              onClick={onOpenPaymentHub}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t("sim.cta")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
