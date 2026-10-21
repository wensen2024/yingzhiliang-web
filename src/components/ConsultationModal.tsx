"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentHub: () => void;
}

interface ConsultationRecord {
  clientName: string;
  clientPhone: string;
  clientWechat: string;
  capitalScale: string;
  preferredTopic: string;
  bookingTime: string;
  notes: string;
  createdAt: string;
}

const CONSULT_KEY = "yzl_consultations_v1";

export function ConsultationModal({ isOpen, onClose, onOpenPaymentHub }: ConsultationModalProps) {
  const { t } = useI18n();
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientWechat, setClientWechat] = useState("");
  const [capitalScale, setCapitalScale] = useState("10万-50万");
  const [preferredTopic, setPreferredTopic] = useState("量化交易系统构建与高胜率策略回测");
  const [bookingTime, setBookingTime] = useState("本周内晚上或周末");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setErrorMsg(t("con.errRequired"));
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const record: ConsultationRecord = {
        clientName,
        clientPhone,
        clientWechat,
        capitalScale,
        preferredTopic,
        bookingTime,
        notes,
        createdAt: new Date().toISOString(),
      };
      // 静态站点无服务端：预约记录保存在浏览器本地
      try {
        const raw = window.localStorage.getItem(CONSULT_KEY);
        const list = raw ? (JSON.parse(raw) as ConsultationRecord[]) : [];
        list.unshift(record);
        window.localStorage.setItem(CONSULT_KEY, JSON.stringify(list.slice(0, 50)));
      } catch {
        /* 存储失败不影响提交成功反馈 */
      }
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(t("con.errNetwork"));
    } finally {
      setIsSubmitting(false);
    }
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

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t("con.successTitle")}
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              {t("con.successDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                  onOpenPaymentHub();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                {t("con.payDeposit")}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
              >
                {t("con.later")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {t("con.title")}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              {t("con.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t("con.name")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("con.namePh")}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t("con.phone")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("con.phonePh")}
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t("con.wechat")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("con.wechatPh")}
                    value={clientWechat}
                    onChange={(e) => setClientWechat(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t("con.capital")}
                  </label>
                  <select
                    value={capitalScale}
                    onChange={(e) => setCapitalScale(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="10万以内">{t("con.capital1")}</option>
                    <option value="10万-50万">{t("con.capital2")}</option>
                    <option value="50万-200万">{t("con.capital3")}</option>
                    <option value="200万以上">{t("con.capital4")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t("con.topic")}
                </label>
                <select
                  value={preferredTopic}
                  onChange={(e) => setPreferredTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="量化交易系统构建与高胜率策略回测">{t("con.topic1")}</option>
                  <option value="资金费率与跨交易所套利稳健理财">{t("con.topic2")}</option>
                  <option value="A股龙虎榜游资与机构买盘穿透战法">{t("con.topic3")}</option>
                  <option value="加密货币合约高频网格与风控断路器">{t("con.topic4")}</option>
                  <option value="企业级私有化量化工作站定制开发">{t("con.topic5")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t("con.notes")}
                </label>
                <textarea
                  rows={2}
                  placeholder={t("con.notesPh")}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {errorMsg && (
                <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t("con.submitting")}</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>{t("con.submit")}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
