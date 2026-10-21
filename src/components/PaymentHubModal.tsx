"use client";

import React from "react";
import { X, QrCode, ShieldCheck, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PaymentCards } from "./PaymentCards";
import type { StoredOrder } from "@/lib/orders";

interface PaymentHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetAmount?: number;
  presetProduct?: string;
  presetProductId?: number;
  onPaymentSuccess?: (order: StoredOrder) => void;
}

export function PaymentHubModal({
  isOpen,
  onClose,
  presetAmount = 299,
  presetProduct,
  presetProductId = 2,
  onPaymentSuccess,
}: PaymentHubModalProps) {
  const { t } = useI18n();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-700 shadow-2xl p-5 sm:p-8 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>{t("hub.pill")}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t("hub.title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t("hub.subtitle")}
          </p>
        </div>

        {/* Payment Card Component */}
        <PaymentCards
          presetAmount={presetAmount}
          presetProduct={presetProduct}
          presetProductId={presetProductId}
          onPaymentSuccess={(order) => {
            if (onPaymentSuccess) {
              onPaymentSuccess(order);
            }
          }}
        />

        {/* Trust Badges Footer */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> {t("hub.badge1")}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Zap className="w-4 h-4 text-amber-400" /> {t("hub.badge2")}
            </span>
          </div>
          <div>
            {t("hub.hotline")}
          </div>
        </div>
      </div>
    </div>
  );
}
