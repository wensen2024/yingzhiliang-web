"use client";

import React from "react";
import { TrendingUp, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { COMPANY, ETH_ADDRESS, BTC_ADDRESS, ALIPAY_COMPANY_MASKED } from "@/lib/site-data";

export function CompanyFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-base font-black text-white tracking-wide">
                {t("foot.brand")}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("foot.about")}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("foot.verified")}</span>
            </div>
          </div>

          {/* Core Products */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t("foot.productsTitle")}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products-store" className="hover:text-emerald-400 transition-colors">
                  {t("foot.link1")}
                </a>
              </li>
              <li>
                <a href="#products-store" className="hover:text-emerald-400 transition-colors">
                  {t("foot.link2")}
                </a>
              </li>
              <li>
                <a href="#products-store" className="hover:text-emerald-400 transition-colors">
                  {t("foot.link3")}
                </a>
              </li>
              <li>
                <a href="#products-store" className="hover:text-emerald-400 transition-colors">
                  {t("foot.link4")}
                </a>
              </li>
              <li>
                <a href="#products-store" className="hover:text-emerald-400 transition-colors">
                  {t("foot.link5")}
                </a>
              </li>
            </ul>
          </div>

          {/* Official Payment Accounts */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t("foot.payTitle")}</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex flex-col">
                <span className="text-blue-400 font-semibold">{t("foot.alipayLabel")}</span>
                <span className="text-slate-300 font-medium">{ALIPAY_COMPANY_MASKED}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-purple-400 font-semibold">{t("foot.ethLabel")}</span>
                <span className="font-mono text-[11px] text-slate-400 break-all">
                  {ETH_ADDRESS}
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-amber-400 font-semibold">{t("foot.btcLabel")}</span>
                <span className="font-mono text-[11px] text-slate-400 break-all">
                  {BTC_ADDRESS}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">{t("foot.contactTitle")}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t("foot.address")}</span>
              </div>
              {COMPANY.emails.map((email) => (
                <div key={email} className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-blue-300 transition-colors">{email}</a>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{COMPANY.hotline}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                {t("foot.hours")}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p className="mb-2">
            <strong>{t("foot.risk")}</strong>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900 text-xs">
            <div>
              {t("foot.copy")}
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>{t("foot.icp")}</span>
              <span>{t("foot.police")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
