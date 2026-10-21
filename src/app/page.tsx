import { HomeClient } from "@/components/HomeClient";
import { PRODUCTS, SIGNALS, DEMO_ORDERS, DAILY_TARGET } from "@/lib/site-data";

export default function HomePage() {
  // 纯静态站点：初始营收数据由演示订单流水计算（与原数据库种子等价）
  let todayRevenue = 0;
  let alipayTotal = 0;
  let ethTotal = 0;
  let btcTotal = 0;

  for (const ord of DEMO_ORDERS) {
    todayRevenue += ord.amount;
    if (ord.paymentMethod === "alipay") alipayTotal += ord.amount;
    else if (ord.paymentMethod === "eth") ethTotal += ord.amount;
    else if (ord.paymentMethod === "btc") btcTotal += ord.amount;
  }

  const round2 = (n: number) => Number(n.toFixed(2));

  const initialStats = {
    dailyTarget: DAILY_TARGET,
    todayRevenue: round2(todayRevenue),
    todayOrdersCount: DEMO_ORDERS.length,
    completionPercentage: Math.round((todayRevenue / DAILY_TARGET) * 100),
    isTargetMet: todayRevenue >= DAILY_TARGET,
    totalRevenue: round2(todayRevenue),
    totalOrdersCount: DEMO_ORDERS.length,
    paymentBreakdown: {
      alipay: round2(alipayTotal),
      eth: round2(ethTotal),
      btc: round2(btcTotal),
    },
    monthlyProjected: round2(todayRevenue * 30),
  };

  return (
    <HomeClient
      initialProducts={PRODUCTS}
      initialSignals={SIGNALS}
      initialStats={initialStats}
    />
  );
}
