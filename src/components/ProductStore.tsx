"use client";

import React, { useState } from "react";
import { Zap, Check, ArrowRight, ShieldCheck, Flame, Sparkles, Code2, Bot, Compass, Award } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_HINT_KEYS, type Product } from "@/lib/site-data";

/** SKU → 周期文案 i18n key */
const PERIOD_KEY: Record<string, string> = {
  "YZL-VIP-TRIAL": "products.period.trial",
  "YZL-VIP-MONTH": "products.period.month",
  "YZL-VIP-YEAR": "products.period.year",
  "YZL-CODE-INDICATOR": "products.period.indicator",
  "YZL-BOT-ARBITRAGE": "products.period.bot",
  "YZL-1ON1-CONSULT": "products.period.consult",
};

interface ProductStoreProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function ProductStore({ products, onSelectProduct }: ProductStoreProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { t } = useI18n();

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "subscription":
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case "indicator":
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case "bot":
        return <Bot className="w-4 h-4 text-purple-400" />;
      case "consulting":
        return <Compass className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  const filters = [
    { id: "all", label: t("prod.filterAll") },
    { id: "subscription", label: t("prod.filterSubscription") },
    { id: "indicator", label: t("prod.filterIndicator") },
    { id: "bot", label: t("prod.filterBot") },
    { id: "consulting", label: t("prod.filterConsulting") },
  ];

  return (
    <section id="products-store" className="py-16 bg-slate-900/60 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 mb-3">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{t("prod.pill")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("prod.title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t("prod.subtitle")}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  activeFilter === f.id
                    ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                    : "bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const featuresList = t(`products.${p.sku}.features`).split("||");
            const badge = p.popularBadgeKey ? t(p.popularBadgeKey) : "";
            const isBestSeller = p.isBestSeller;
            const isPartner = p.isPartner;
            const period = t(PERIOD_KEY[p.sku] ?? "products.period.month");
            const hintKey = PRODUCT_HINT_KEYS[p.sku];

            return (
              <div
                key={p.id}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 relative ${
                  isBestSeller
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/10 hover:border-emerald-400"
                    : isPartner
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-xl shadow-amber-500/10 hover:border-amber-400"
                    : "bg-slate-950/90 border border-slate-800 hover:border-slate-700 hover:shadow-lg"
                }`}
              >
                {/* Badge */}
                {badge && (
                  <div className="absolute -top-3 right-6">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        isBestSeller
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                          : isPartner
                          ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md"
                          : "bg-slate-800 text-slate-200 border border-slate-700"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Category & Period */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-slate-900 border border-slate-800">
                      {getCategoryIcon(p.category)}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug mb-1">
                    {t(`products.${p.sku}.name`)}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium mb-4">
                    {t(`products.${p.sku}.subtitle`)}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-400">{t("prod.priceLabel")}</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                        ¥{p.price}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          ¥{p.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>{t("prod.unitLabel")}</span>
                      {hintKey && (
                        <span className="text-emerald-400 font-semibold">
                          {t(hintKey)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {t(`products.${p.sku}.description`)}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
                    {featuresList.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectProduct(p)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      isBestSeller
                        ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
                        : isPartner
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    }`}
                  >
                    <span>{t("prod.buy")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-2 text-center text-[10px] text-slate-500">
                    {t("prod.support")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
