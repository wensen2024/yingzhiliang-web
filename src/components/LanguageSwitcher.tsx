"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n-core";

interface LanguageSwitcherProps {
  /** 紧凑模式：仅显示地球图标 + 当前语言 label */
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ compact = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t("lang.label")}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 sm:right-0 mt-2 w-44 max-h-72 overflow-y-auto rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-1.5"
        >
          <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
            {t("lang.label")} / Language
          </div>
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                l.code === locale
                  ? "bg-emerald-500/15 text-emerald-300 font-bold"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="truncate">{l.label}</span>
              {l.code === locale && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
