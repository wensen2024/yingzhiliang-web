"use client";

import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Zap, Sparkles, QrCode, Search, Award, BarChart3, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  onOpenPaymentHub: () => void;
  onOpenOrderLookup: () => void;
  todayRevenue: number;
  dailyTarget: number;
}

export function Navbar({ onOpenPaymentHub, onOpenOrderLookup, todayRevenue, dailyTarget }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, locale } = useI18n();
  const percent = Math.min(Math.round((todayRevenue / dailyTarget) * 100), 999);
  const isZh = locale === "zh-CN" || locale === "zh-TW";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-500/20 bg-slate-950/90 backdrop-blur-md">
      {/* Top Ticker Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 border-b border-emerald-500/10 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{t("ticker.engine")}</span>
            <span className="hidden sm:inline text-slate-400">
              {t("ticker.todayRevenue", {
                revenue: `¥${todayRevenue.toFixed(2)}`,
                target: `¥${dailyTarget}`,
              })}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {t("ticker.completion", { percent })} 
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button
              onClick={onOpenOrderLookup}
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("ticker.orderLookup")}</span>
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{t("ticker.verified")}</span>
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isZh ? (
                  <span className="text-lg font-black tracking-wider text-white">
                    盈指量<span className="text-emerald-400">科技</span>
                  </span>
                ) : (
                  <span className="text-lg font-black tracking-wider text-white">
                    {t("foot.brand")}
                  </span>
                )}
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {t("nav.brandBadge")}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight">
                {t("nav.tagline")}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#revenue-dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>{t("nav.dashboard")}</span>
            </a>
            <a href="#products-store" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t("nav.products")}</span>
            </a>
            <a href="#quant-radar" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>{t("nav.signals")}</span>
            </a>
            <a href="#master-blueprint" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" />
              <span>{t("nav.blueprint")}</span>
            </a>
            <a href="#revenue-simulator" className="hover:text-emerald-400 transition-colors">
              {t("nav.simulator")}
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPaymentHub}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all cursor-pointer border border-blue-400/30"
            >
              <QrCode className="w-4 h-4 text-white animate-pulse" />
              <span>{t("nav.paymentHub")}</span>
            </button>
            <a
              href="#products-store"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>{t("nav.cta")}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-3 space-y-2">
            <a
              href="#revenue-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
            >
              {t("nav.menuDashboard")}
            </a>
            <a
              href="#products-store"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-amber-400"
            >
              {t("nav.menuProducts")}
            </a>
            <a
              href="#quant-radar"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-blue-400"
            >
              {t("nav.menuSignals")}
            </a>
            <a
              href="#master-blueprint"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-purple-400"
            >
              {t("nav.menuBlueprint")}
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPaymentHub();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>{t("nav.menuPayment")}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderLookup();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm"
              >
                <Search className="w-4 h-4" />
                <span>{t("nav.menuLookup")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
