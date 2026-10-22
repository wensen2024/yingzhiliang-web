import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { translate } from "@/lib/i18n-core";

export const metadata: Metadata = {
  title: translate("en", "meta.title"),
  description: translate("en", "meta.description"),
  keywords:
    "盈指量, 盈指量杭州科技有限公司, AI量化, 搞钱, 量化策略, TradingView指标, 资金费率套利, 支付宝直收, Web3支付",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
