"use client";

/**
 * 盈指量官网 i18n React 绑定（Context + Provider + useI18n hook）。
 * 词典与 translate 纯函数见同目录 i18n-core.ts。
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { LOCALES, translate, type Locale } from "./i18n-core";

// ─── React Context ───

const STORAGE_KEY = "yzl_locale_v1";

export interface I18nValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALES.some((l) => l.code === saved)) {
      return saved as Locale;
    }
    const nav = (window.navigator.language || "").toLowerCase();
    const hit = LOCALES.find((l) => nav.startsWith(l.code.toLowerCase()));
    if (hit) return hit.code;
  } catch {
    /* ignore */
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // 挂载后再探测本地/浏览器语言，避免 SSR 水合不一致
  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
    return {
      locale,
      dir: meta.dir,
      setLocale,
      t: (key: string, vars?: Record<string, string | number>) =>
        translate(locale, key, vars),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
