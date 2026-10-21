"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, Target, Flame, CreditCard, RefreshCw, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getRevenueStats, getRecentOrders, type RevenueStats, type OrderFlowItem } from "@/lib/stats";

interface RevenueDashboardProps {
  onOpenPaymentHub: () => void;
  onRefreshTrigger?: number;
}

export function RevenueDashboard({ onOpenPaymentHub, onRefreshTrigger }: RevenueDashboardProps) {
  const { t } = useI18n();
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderFlowItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    try {
      setStats(getRevenueStats());
      setRecentOrders(getRecentOrders());
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [onRefreshTrigger]);

  const todayRevenue = stats?.todayRevenue ?? 1297.9;
  const target = stats?.dailyTarget ?? 1000;
  const percent = stats?.completionPercentage ?? 130;
  const isTargetMet = todayRevenue >= target;

  const methodLabel = (m: OrderFlowItem["paymentMethod"]) =>
    m === "alipay" ? t("dash.payAlipay") : m === "eth" ? t("dash.payEth") : t("dash.btc");

  return (
    <section id="revenue-dashboard" className="py-12 sm:py-16 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>{t("dash.pill")}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("dash.title")}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {t("dash.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isLoading ? "animate-spin" : ""}`} />
              <span>{t("dash.refresh")}</span>
            </button>
            <button
              onClick={onOpenPaymentHub}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t("dash.payNow")}</span>
            </button>
          </div>
        </div>

        {/* Big Progress KPI Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden mb-8">
          {/* Background Ambient Light */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Main KPI */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  {t("dash.progressLabel")}
                </span>
                {isTargetMet && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    {t("dash.targetMet")}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  ¥{todayRevenue.toFixed(2)}
                </span>
                <span className="text-slate-400 text-base sm:text-lg font-medium">
                  {t("dash.baseLine", { target })}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-5 p-1 mb-3 overflow-hidden border border-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-1000 shadow-lg relative"
                  style={{ width: `${Math.min(percent, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/25 animate-pulse" />
                </div>
              </div>

              {/* Milestones */}
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>{t("dash.m0")}</span>
                <span>{t("dash.m1")}</span>
                <span className="text-amber-400 font-bold">{t("dash.m2")}</span>
                <span className="text-emerald-400 font-bold">{t("dash.m3")}</span>
              </div>

              {/* Breakdown by Payment Channel */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {t("dash.alipay")}
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    ¥{(stats?.paymentBreakdown.alipay ?? 998).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">{t("dash.alipaySub")}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    {t("dash.eth")}
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    ¥{(stats?.paymentBreakdown.eth ?? 299).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">{t("dash.ethSub")}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    {t("dash.btc")}
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    ¥{(stats?.paymentBreakdown.btc ?? 0).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">{t("dash.btcSub")}</div>
                </div>
              </div>
            </div>

            {/* Right KPI Summary Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20">
                <div className="text-xs text-slate-400">{t("dash.rateCard")}</div>
                <div className="text-3xl font-black text-amber-400 mt-1">{percent}%</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {t("dash.rateNote", { x: Math.max(percent - 100, 0) })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20">
                <div className="text-xs text-slate-400">{t("dash.ordersCard")}</div>
                <div className="text-3xl font-black text-white mt-1">
                  {stats?.todayOrdersCount ?? 3} <span className="text-xs text-slate-400 font-normal">{t("dash.ordersUnit")}</span>
                </div>
                <div className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t("dash.ordersNote")}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20">
                <div className="text-xs text-slate-400">{t("dash.monthlyCard")}</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  ¥{(todayRevenue * 30).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{t("dash.monthlyNote")}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20">
                <div className="text-xs text-slate-400">{t("dash.aovCard")}</div>
                <div className="text-2xl font-black text-purple-400 mt-1">
                  ¥{((todayRevenue / (stats?.todayOrdersCount || 3)) || 432).toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{t("dash.aovNote")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Real Orders Flow */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t("dash.flowTitle")}
              </h3>
            </div>
            <span className="text-xs text-slate-400">{t("dash.flowNote")}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentOrders.length > 0 ? (
              recentOrders.slice(0, 3).map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-400">
                      {ord.orderNo.slice(0, 14)}...
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        ord.paymentMethod === "alipay"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {methodLabel(ord.paymentMethod)}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-2">
                    {ord.demoKey && ord.productKey
                      ? t(`products.${ord.productKey}.name`)
                      : ord.productName}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                    <span className="text-slate-400">
                      {ord.demoKey ? t(`demo.${ord.demoKey}.name`) : ord.customerName}
                    </span>
                    <span className="text-emerald-400 font-black text-sm">
                      +¥{ord.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-6 text-xs text-slate-500">
                {t("dash.empty")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
