/**
 * 站点静态数据层（无数据库依赖，适配 Cloudflare Pages 静态托管）
 * 文案类内容全部走 i18n 翻译字典，本文件仅存放非本地化字段。
 */

// ─── 当前收款方式：ETH / BTC ───
// 当前公开页面仅展示 ETH 与 BTC 收款方式。
export const ETH_ADDRESS = "0xFCbA8F85BA8F868B53CFB14dE5362f7822B39f4D";
export const BTC_ADDRESS = "bc1qat87yet7dsyjumlk94c5r0wwwwde6wtedpxq";

// ─── 产品目录（文案见 i18n translations.products） ───
export interface Product {
  id: number;
  sku: string;
  category: "subscription" | "indicator" | "bot" | "consulting";
  price: number;
  originalPrice: number | null;
  direction: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "SHORT";
  popularBadgeKey: string | null; // i18n key of badge
  isBestSeller: boolean;
  isPartner: boolean;
  sortOrder: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "YZL-VIP-TRIAL",
    category: "subscription",
    price: 19.9,
    originalPrice: 99,
    direction: "BUY",
    popularBadgeKey: "products.badge.newUser",
    isBestSeller: true,
    isPartner: false,
    sortOrder: 1,
  },
  {
    id: 2,
    sku: "YZL-VIP-MONTH",
    category: "subscription",
    price: 299,
    originalPrice: 599,
    direction: "STRONG_BUY",
    popularBadgeKey: "products.badge.bestSeller",
    isBestSeller: true,
    isPartner: false,
    sortOrder: 2,
  },
  {
    id: 3,
    sku: "YZL-VIP-YEAR",
    category: "subscription",
    price: 1999,
    originalPrice: 3999,
    direction: "STRONG_BUY",
    popularBadgeKey: "products.badge.partner",
    isBestSeller: false,
    isPartner: true,
    sortOrder: 3,
  },
  {
    id: 4,
    sku: "YZL-CODE-INDICATOR",
    category: "indicator",
    price: 699,
    originalPrice: 1599,
    direction: "BUY",
    popularBadgeKey: "products.badge.coder",
    isBestSeller: false,
    isPartner: false,
    sortOrder: 4,
  },
  {
    id: 5,
    sku: "YZL-BOT-ARBITRAGE",
    category: "bot",
    price: 2499,
    originalPrice: 5800,
    direction: "BUY",
    popularBadgeKey: "products.badge.whale",
    isBestSeller: false,
    isPartner: false,
    sortOrder: 5,
  },
  {
    id: 6,
    sku: "YZL-1ON1-CONSULT",
    category: "consulting",
    price: 999,
    originalPrice: 2000,
    direction: "BUY",
    popularBadgeKey: "products.badge.hnw",
    isBestSeller: false,
    isPartner: false,
    sortOrder: 6,
  },
];

// 产品卖点提示（i18n key）
export const PRODUCT_HINT_KEYS: Record<string, string> = {
  "YZL-VIP-TRIAL": "products.hints.trial",
  "YZL-VIP-MONTH": "products.hints.month",
  "YZL-VIP-YEAR": "products.hints.year",
  "YZL-CODE-INDICATOR": "products.hints.indicator",
  "YZL-BOT-ARBITRAGE": "products.hints.bot",
  "YZL-1ON1-CONSULT": "products.hints.consult",
};

// ─── 量化信号（文案见 i18n translations.signals） ───
export interface QuantSignal {
  id: number;
  symbol: string;
  market: "Crypto" | "A-Share" | "US-Stock" | "Commodity";
  direction: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "SHORT";
  entryPrice: string;
  targetPrice: string;
  stopLossPrice: string;
  winRate: string;
  profitFactor: string;
  timeframe: string;
  isVipOnly: boolean;
}

export const SIGNALS: QuantSignal[] = [
  {
    id: 1,
    symbol: "BTC/USDT",
    market: "Crypto",
    direction: "STRONG_BUY",
    entryPrice: "88450.00",
    targetPrice: "94500.00",
    stopLossPrice: "86200.00",
    winRate: "86.40",
    profitFactor: "3.45",
    timeframe: "4H",
    isVipOnly: false,
  },
  {
    id: 2,
    symbol: "ETH/USDT",
    market: "Crypto",
    direction: "BUY",
    entryPrice: "2680.00",
    targetPrice: "2950.00",
    stopLossPrice: "2560.00",
    winRate: "81.20",
    profitFactor: "2.85",
    timeframe: "1H",
    isVipOnly: false,
  },
  {
    id: 3,
    symbol: "SSE Composite / 510050",
    market: "A-Share",
    direction: "BUY",
    entryPrice: "2.7200",
    targetPrice: "2.9800",
    stopLossPrice: "2.6300",
    winRate: "79.80",
    profitFactor: "2.90",
    timeframe: "1D",
    isVipOnly: true,
  },
  {
    id: 4,
    symbol: "Nasdaq 100 / QQQ",
    market: "US-Stock",
    direction: "STRONG_BUY",
    entryPrice: "512.40",
    targetPrice: "545.00",
    stopLossPrice: "498.00",
    winRate: "84.20",
    profitFactor: "3.20",
    timeframe: "1D",
    isVipOnly: true,
  },
  {
    id: 5,
    symbol: "Spot Gold / XAUUSD",
    market: "Commodity",
    direction: "STRONG_BUY",
    entryPrice: "2695.50",
    targetPrice: "2780.00",
    stopLossPrice: "2650.00",
    winRate: "88.00",
    profitFactor: "3.80",
    timeframe: "4H",
    isVipOnly: false,
  },
];

// ─── 演示订单流水（社交证明，时间固定） ───
export interface DemoOrder {
  orderNo: string;
  customerName: string;
  productKey: string; // i18n key for product name
  amount: number;
  paymentMethod: "alipay" | "eth" | "btc";
  licenseKey: string;
  deliveryContent: string;
  createdAt: string;
}

export const DEMO_ORDERS: DemoOrder[] = [
  {
    orderNo: "YZL20260821001",
    customerName: "Hangzhou Quant Partner",
    productKey: "YZL-CODE-INDICATOR",
    amount: 699,
    paymentMethod: "alipay",
    licenseKey: "YZL-TM4-8F92-CC31-90B1",
    deliveryContent: "已授权通达信+TradingView源码及教程包下载权限",
    createdAt: "2026-08-21T09:12:00+08:00",
  },
  {
    orderNo: "YZL20260821002",
    customerName: "Web3CryptoTrader",
    productKey: "YZL-VIP-MONTH",
    amount: 299,
    paymentMethod: "eth",
    licenseKey: "YZL-VIP-M-9024-ETH-VALID",
    deliveryContent: "已开通Telegram+邮件实时Alpha推送",
    createdAt: "2026-08-21T10:05:00+08:00",
  },
  {
    orderNo: "YZL20260821003",
    customerName: "Shanghai PE Investor",
    productKey: "YZL-VIP-MONTH",
    amount: 299,
    paymentMethod: "alipay",
    licenseKey: "YZL-VIP-M-3312-ALIPAY-OK",
    deliveryContent: "已开通VIP服务权限",
    createdAt: "2026-08-21T11:48:00+08:00",
  },
];

// 每日目标
export const DAILY_TARGET = 1000;

// 汇率近似值（仅用于展示换算）
export const FX = { usdt: 7.25, eth: 18500, btc: 680000 };

// 公司信息
export const COMPANY = {
  nameShort: "Yingzhiliang Tech",
  emails: ["121126652@qq.com", "121126652qq@gmail.com"],
  hotline: "400-880-YING",
  icp: "Zhejiang ICP Bei 20248888 No.-1",
};
