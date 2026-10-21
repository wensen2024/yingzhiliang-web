/**
 * 营收统计助手：演示订单流水（构建期快照）+ 浏览器本地订单（localStorage）。
 * 替代原 PostgreSQL /api/stats 与 /api/orders 服务端接口。
 */

import { loadOrders } from "./orders";
import { DEMO_ORDERS, DAILY_TARGET } from "./site-data";

export interface RevenueStats {
  dailyTarget: number;
  todayRevenue: number;
  todayOrdersCount: number;
  completionPercentage: number;
  isTargetMet: boolean;
  totalRevenue: number;
  totalOrdersCount: number;
  paymentBreakdown: {
    alipay: number;
    eth: number;
    btc: number;
  };
  monthlyProjected: number;
}

export interface OrderFlowItem {
  id: string;
  orderNo: string;
  productName: string;
  customerName: string;
  amount: number;
  paymentMethod: "alipay" | "eth" | "btc";
  createdAt: string;
  /** 演示订单对应的 i18n 客户名 key 序号（1/2/3） */
  demoKey?: string;
  /** 演示订单的产品 SKU（用于 i18n 产品名解析） */
  productKey?: string;
}

const round2 = (n: number) => Number(n.toFixed(2));

/** 汇总营收统计（演示订单按今日计，与页面初始数据口径一致） */
export function getRevenueStats(): RevenueStats {
  const localOrders = loadOrders();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let todayRevenue = 0;
  let todayOrdersCount = 0;
  let totalRevenue = 0;
  let alipay = 0;
  let eth = 0;
  let btc = 0;

  for (const o of DEMO_ORDERS) {
    todayRevenue += o.amount;
    todayOrdersCount += 1;
    totalRevenue += o.amount;
    if (o.paymentMethod === "alipay") alipay += o.amount;
    else if (o.paymentMethod === "eth") eth += o.amount;
    else if (o.paymentMethod === "btc") btc += o.amount;
  }

  for (const o of localOrders) {
    const amt = Number(o.amount) || 0;
    totalRevenue += amt;
    const d = new Date(o.createdAt);
    if (d >= todayStart) {
      todayRevenue += amt;
      todayOrdersCount += 1;
    }
    if (o.paymentMethod === "alipay") alipay += amt;
    else if (o.paymentMethod === "eth") eth += amt;
    else if (o.paymentMethod === "btc") btc += amt;
  }

  return {
    dailyTarget: DAILY_TARGET,
    todayRevenue: round2(todayRevenue),
    todayOrdersCount,
    completionPercentage: Math.round((todayRevenue / DAILY_TARGET) * 100),
    isTargetMet: todayRevenue >= DAILY_TARGET,
    totalRevenue: round2(totalRevenue),
    totalOrdersCount: DEMO_ORDERS.length + localOrders.length,
    paymentBreakdown: {
      alipay: round2(alipay),
      eth: round2(eth),
      btc: round2(btc),
    },
    monthlyProjected: round2(todayRevenue * 30),
  };
}

/** 最近订单流水（本地订单优先，演示订单补充，最多 6 条） */
export function getRecentOrders(): OrderFlowItem[] {
  const local: OrderFlowItem[] = loadOrders().map((o, idx) => ({
    id: `local-${o.orderNo}-${idx}`,
    orderNo: o.orderNo,
    productName: o.productName,
    customerName: o.customerName,
    amount: Number(o.amount) || 0,
    paymentMethod: o.paymentMethod,
    createdAt: o.createdAt,
  }));

  const demo: OrderFlowItem[] = DEMO_ORDERS.map((o, idx) => ({
    id: `demo-${o.orderNo}`,
    orderNo: o.orderNo,
    productName: "", // 由组件按 locale 从 i18n 解析
    customerName: o.customerName,
    amount: o.amount,
    paymentMethod: o.paymentMethod,
    createdAt: o.createdAt,
    demoKey: String(idx + 1),
    productKey: o.productKey,
  }));

  return [...local, ...demo].slice(0, 6);
}
