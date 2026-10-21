"use client";

import React, { useState } from "react";
import { X, Search, CheckCircle2, Download, Key, AlertCircle, Copy, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { findOrders, type StoredOrder } from "@/lib/orders";
import { DEMO_ORDERS } from "@/lib/site-data";

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderLookupModal({ isOpen, onClose }: OrderLookupModalProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<StoredOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setIsLoading(true);
    setErrorMsg("");
    setOrderResult(null);

    try {
      // 1) 本地订单（本浏览器下单记录）
      const localHits = findOrders(q);
      if (localHits.length > 0) {
        setOrderResult(localHits[0]);
        return;
      }

      // 2) 演示订单流水（按订单号匹配）
      const demoHit = DEMO_ORDERS.find(
        (o) => o.orderNo.toUpperCase() === q.toUpperCase()
      );
      if (demoHit) {
        setOrderResult({
          orderNo: demoHit.orderNo,
          customerName: demoHit.customerName,
          customerContact: "-",
          productId: null,
          productName: t(`products.${demoHit.productKey}.name`),
          amount: demoHit.amount,
          currency: demoHit.paymentMethod === "alipay" ? "CNY" : demoHit.paymentMethod.toUpperCase(),
          paymentMethod: demoHit.paymentMethod,
          status: "completed",
          licenseKey: demoHit.licenseKey,
          deliveryContent: demoHit.deliveryContent,
          createdAt: demoHit.createdAt,
        });
        return;
      }

      setErrorMsg(t("look.notFound"));
    } catch (err) {
      console.error(err);
      setErrorMsg(t("look.errNetwork"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {t("look.title")}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          {t("look.desc")}
        </p>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            required
            placeholder={t("look.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isLoading ? t("look.searching") : t("look.search")}</span>
          </button>
        </form>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Order result details */}
        {orderResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">{t("look.status")}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {t("look.status")}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">{t("look.orderNo")}</span>
                <span className="font-mono text-white font-bold">{orderResult.orderNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("look.product")}</span>
                <span className="font-semibold text-slate-200">{orderResult.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("look.amount")}</span>
                <span className="font-bold text-emerald-400">
                  ¥{parseFloat(String(orderResult.amount)).toFixed(2)} ({orderResult.paymentMethod.toUpperCase()})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t("look.time")}</span>
                <span className="text-slate-400">
                  {orderResult.createdAt ? new Date(orderResult.createdAt).toLocaleString() : "刚刚"}
                </span>
              </div>
            </div>

            {/* License key display */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>{t("look.license")}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-amber-500/30">
                <span className="font-mono text-amber-300 font-black text-sm">
                  {orderResult.licenseKey || "YZL-VIP-INSTANT-VALID"}
                </span>
                <button
                  onClick={() => handleCopyKey(orderResult.licenseKey || "YZL-VIP-INSTANT-VALID")}
                  className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  title={t("look.copy")}
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Download links */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="/downloads/trendmaster-v4.pine"
                download
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t("look.dlPine")}</span>
              </a>
              <a
                href="/downloads/arbitrage-bot.py"
                download
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t("look.dlBot")}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
