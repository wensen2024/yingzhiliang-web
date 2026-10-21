"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck, Copy, Check, Zap, Building2, Wallet } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ETH_ADDRESS, BTC_ADDRESS, ALIPAY_PAY_URL, ALIPAY_COMPANY_MASKED } from "@/lib/site-data";
import { QrImage } from "./QrImage";

export function PaymentStationSection() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { t } = useI18n();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2500);
  };

  return (
    <section id="official-qr" className="py-16 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-3">
            <QrCode className="w-3.5 h-3.5" />
            <span>{t("pay.pill")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("pay.title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t("pay.subtitle")}
          </p>
        </div>

        {/* 3 Payment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Alipay */}
          <div className="rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl border-4 border-blue-500 flex flex-col justify-between">
            <div>
              {/* Alipay Blue Header */}
              <div className="bg-[#1677ff] text-white px-5 py-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-7 h-7 bg-white text-[#1677ff] rounded-lg flex items-center justify-center font-black text-sm">
                    支
                  </div>
                  <span className="text-xl font-bold tracking-wide">{t("pay.alipayHeader")}</span>
                </div>
                <div className="text-base font-extrabold tracking-wider">
                  {t("pay.alipaySlogan")}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-6 flex flex-col items-center bg-white">
                <div className="relative w-52 h-52 rounded-xl border border-slate-200 p-2 bg-white flex items-center justify-center shadow-inner">
                  <QrImage
                    text={ALIPAY_PAY_URL}
                    alt={t("pay.alipayHeader")}
                    className="w-full h-full object-contain"
                  />
                  {/* Center Bull badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-9 h-9 rounded-lg bg-red-600 border-2 border-white shadow-md flex items-center justify-center text-white">
                      <Zap className="w-5 h-5 fill-white text-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-sm font-bold text-slate-900">
                    {ALIPAY_COMPANY_MASKED}
                  </div>
                  <div className="text-xs text-blue-600 font-bold mt-1">
                    {t("pay.alipayScan")}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-3 text-center text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> {t("pay.alipayVerified")}
              </span>
            </div>
          </div>

          {/* Card 2: Ethereum */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl border-2 border-purple-500/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/40">
                    Ξ
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {t("pay.ethAccount")}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ERC-20 / L2
                </span>
              </div>

              {/* QR Image */}
              <div className="relative w-52 h-52 mx-auto rounded-xl bg-white p-2 flex items-center justify-center shadow-inner">
                <QrImage
                  text={ETH_ADDRESS}
                  alt={t("pay.ethTitle")}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#627eea] text-white flex items-center justify-center text-xs font-black shadow">
                    Ξ
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-white">{t("pay.ethTitle")}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {t("pay.ethDesc")}
                </div>

                <div className="mt-3 p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-purple-300 break-all text-left">
                    {ETH_ADDRESS}
                  </span>
                  <button
                    onClick={() => copyToClipboard(ETH_ADDRESS, "eth")}
                    className="p-1 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all cursor-pointer flex-shrink-0"
                    title={t("pay.ethCopy")}
                  >
                    {copiedAddress === "eth" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedAddress === "eth" && (
                  <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {t("pay.ethCopied")}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              {t("pay.ethSupport")}
            </div>
          </div>

          {/* Card 3: Bitcoin */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl border-2 border-amber-500/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/40">
                    ₿
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {t("pay.btcAccount")}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SegWit
                </span>
              </div>

              {/* QR Image */}
              <div className="relative w-52 h-52 mx-auto rounded-xl bg-white p-2 flex items-center justify-center shadow-inner">
                <QrImage
                  text={BTC_ADDRESS}
                  alt={t("pay.btcTitle")}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#f7931a] text-slate-950 flex items-center justify-center text-xs font-black shadow">
                    ₿
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-white">{t("pay.btcTitle")}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {t("pay.btcDesc")}
                </div>

                <div className="mt-3 p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-amber-300 break-all text-left">
                    {BTC_ADDRESS}
                  </span>
                  <button
                    onClick={() => copyToClipboard(BTC_ADDRESS, "btc")}
                    className="p-1 rounded bg-amber-600/30 text-amber-300 hover:bg-amber-600 hover:text-white transition-all cursor-pointer flex-shrink-0"
                    title={t("pay.btcCopy")}
                  >
                    {copiedAddress === "btc" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedAddress === "btc" && (
                  <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {t("pay.btcCopied")}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
              {t("pay.btcSupport")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
