"use client";

import React, { useState } from "react";
import { Copy, Check, ShieldCheck, Zap, AlertCircle, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useI18n } from "@/lib/i18n";
import {
  ETH_ADDRESS,
  BTC_ADDRESS,
  FX,
} from "@/lib/site-data";
import {
  generateOrderNo,
  generateLicenseKey,
  saveOrder,
  type StoredOrder,
} from "@/lib/orders";
import { QrImage } from "./QrImage";

interface PaymentCardsProps {
  onPaymentSuccess?: (order: StoredOrder) => void;
  presetAmount?: number;
  presetProduct?: string;
  presetProductId?: number;
}

const AMOUNT_PRESETS: { labelKey: string; amt: number }[] = [
  { labelKey: "pc.amtTrial", amt: 19.9 },
  { labelKey: "pc.amtMonth", amt: 299 },
  { labelKey: "pc.amtIndicator", amt: 699 },
  { labelKey: "pc.amtConsult", amt: 999 },
  { labelKey: "pc.amtYear", amt: 1999 },
  { labelKey: "pc.amtBot", amt: 2499 },
];

export function PaymentCards({
  onPaymentSuccess,
  presetAmount = 299,
  presetProduct,
  presetProductId = 2,
}: PaymentCardsProps) {
  const { t } = useI18n();
  const productName = presetProduct ?? t("hub.defaultProduct");
  const [activeTab, setActiveTab] = useState<"eth" | "btc">("eth");
  const [selectedAmount, setSelectedAmount] = useState<number>(presetAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Form submission states
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [paymentProof, setPaymentProof] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<StoredOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // Approximate crypto conversions for demonstration
  const usdtApprox = (effectiveAmount / FX.usdt).toFixed(2);
  const ethApprox = (effectiveAmount / FX.eth).toFixed(4);
  const btcApprox = (effectiveAmount / FX.btc).toFixed(6);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerContact) {
      setErrorMsg(t("pc.errContact"));
      return;
    }
    if (effectiveAmount <= 0) {
      setErrorMsg(t("pc.errAmount"));
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const cryptoAmt =
        activeTab === "eth"
          ? `${ethApprox} ETH (~${usdtApprox} USDT)`
          : activeTab === "btc"
          ? `${btcApprox} BTC`
          : undefined;

      const licenseKey = generateLicenseKey();
      const order: StoredOrder = {
        orderNo: generateOrderNo(),
        customerName: customerName || "加密交易员",
        customerContact,
        productId: presetProductId,
        productName,
        amount: effectiveAmount,
        currency: activeTab.toUpperCase(),
        cryptoAmount: cryptoAmt,
        paymentMethod: activeTab,
        paymentProof: paymentProof || "Web3链上支付转账",
        status: "completed",
        licenseKey,
        deliveryContent: `${t("pc.license")}${licenseKey} · ${t("look.status")}`,
        createdAt: new Date().toISOString(),
      };

      saveOrder(order);
      setOrderResult(order);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onPaymentSuccess) {
        onPaymentSuccess(order);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t("pc.errFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Preset Amount Selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          {t("pc.amountLabel")}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {AMOUNT_PRESETS.map((item) => (
            <button
              key={item.amt}
              type="button"
              onClick={() => {
                setSelectedAmount(item.amt);
                setCustomAmount("");
              }}
              className={`p-2 rounded-lg text-center transition-all cursor-pointer border ${
                selectedAmount === item.amt && !customAmount
                  ? "bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] text-slate-400">{t(item.labelKey)}</div>
              <div className="text-sm font-black text-emerald-400">¥{item.amt}</div>
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            placeholder={t("pc.customPlaceholder")}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-40 px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <span className="text-xs text-slate-400">
            {t("pc.currentAmount")}
            <strong className="text-amber-400 font-bold text-sm">
              {" "}
              ¥{effectiveAmount.toFixed(2)}
            </strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab("eth")}
          className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
            activeTab === "eth"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
            Ξ
          </div>
          <span>{t("pc.tabEth")}</span>
        </button>

        <button
          onClick={() => setActiveTab("btc")}
          className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
            activeTab === "btc"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-slate-950 text-xs font-bold">
            ₿
          </div>
          <span>{t("pc.tabBtc")}</span>
        </button>
      </div>

      {/* Card Content Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* QR Code Presentation Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center">
          {/* Ethereum Card */}
          {activeTab === "eth" && (
            <div className="w-full max-w-[320px] rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl border-2 border-purple-500/60 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/40">
                    Ξ
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {t("pay.ethAccount")}
                  </span>
                </div>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ERC-20 / L2
                </span>
              </div>

              {/* QR Image */}
              <div className="relative w-56 h-56 mx-auto rounded-xl bg-white p-2 flex items-center justify-center">
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
                    onClick={() => handleCopy(ETH_ADDRESS, "eth")}
                    className="p-1 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all cursor-pointer flex-shrink-0"
                    title={t("pay.ethCopy")}
                  >
                    {copiedType === "eth" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedType === "eth" && (
                  <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {t("pay.ethCopied")}
                  </div>
                )}

                <div className="mt-2 text-xs text-slate-400 flex justify-between px-1">
                  <span>{t("pc.usdt")}</span>
                  <span className="font-bold text-emerald-400">~{usdtApprox} USDT</span>
                </div>
                <div className="text-xs text-slate-400 flex justify-between px-1 mt-0.5">
                  <span>{t("pc.eth")}</span>
                  <span className="font-bold text-purple-400">~{ethApprox} ETH</span>
                </div>
              </div>
            </div>
          )}

          {/* Bitcoin Card */}
          {activeTab === "btc" && (
            <div className="w-full max-w-[320px] rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl border-2 border-amber-500/60 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/40">
                    ₿
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {t("pay.btcAccount")}
                  </span>
                </div>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SegWit
                </span>
              </div>

              {/* QR Image */}
              <div className="relative w-56 h-56 mx-auto rounded-xl bg-white p-2 flex items-center justify-center">
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
                    onClick={() => handleCopy(BTC_ADDRESS, "btc")}
                    className="p-1 rounded bg-amber-600/30 text-amber-300 hover:bg-amber-600 hover:text-white transition-all cursor-pointer flex-shrink-0"
                    title={t("pay.btcCopy")}
                  >
                    {copiedType === "btc" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {copiedType === "btc" && (
                  <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {t("pay.btcCopied")}
                  </div>
                )}

                <div className="mt-2 text-xs text-slate-400 flex justify-between px-1">
                  <span>{t("pc.btc")}</span>
                  <span className="font-bold text-amber-400">~{btcApprox} BTC</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification & Instant Delivery Form Column (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t("pc.formTitle")}
            </h3>
          </div>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            {t("pc.formDesc")}
          </p>

          {/* Form */}
          <form onSubmit={handleConfirmPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t("pc.productLabel")}
              </label>
              <input
                type="text"
                value={productName}
                readOnly
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t("pc.nameLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("pc.namePlaceholder")}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t("pc.contactLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("pc.contactPlaceholder")}
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t("pc.proofCryptoLabel")}
              </label>
              <input
                type="text"
                placeholder={t("pc.proofCryptoPlaceholder")}
                value={paymentProof}
                onChange={(e) => setPaymentProof(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t("pc.submitting")}</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>
                    {t("pc.submit", { amount: effectiveAmount.toFixed(2) })}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Success result banner */}
          {orderResult && (
            <div className="mt-5 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
              <div className="flex items-center gap-2 font-black text-white text-sm mb-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>{t("pc.successTitle")}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  {t("pc.orderNo")}
                  <span className="font-mono text-white font-bold">
                    {orderResult.orderNo}
                  </span>
                </div>
                <div>
                  {t("pc.license")}
                  <span className="font-mono text-amber-300 font-black text-sm bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                    {orderResult.licenseKey}
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] pt-1">
                  {t("pc.delivery")}
                  {orderResult.deliveryContent}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/downloads/trendmaster-v4.pine"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{t("pc.dlPine")}</span>
                </a>
                <a
                  href="/downloads/arbitrage-bot.py"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-emerald-300 border border-emerald-500/30 hover:bg-slate-700 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{t("pc.dlBot")}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
