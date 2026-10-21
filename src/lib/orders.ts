/**
 * 客户端订单存储（localStorage）—— 替代原 PostgreSQL 后端。
 * 静态站点无服务端，订单与激活码在浏览器本地生成与保存。
 */

const ORDERS_KEY = "yzl_orders_v1";

export interface StoredOrder {
  orderNo: string;
  customerName: string;
  customerContact: string;
  productId: number | null;
  productName: string;
  amount: number;
  currency: string;
  cryptoAmount?: string;
  paymentMethod: "alipay" | "eth" | "btc";
  paymentProof?: string;
  status: string;
  licenseKey: string;
  deliveryContent: string;
  createdAt: string;
}

function randomHex(len: number): string {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function generateOrderNo(): string {
  const timestamp = Date.now().toString().slice(-8);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `YZL${timestamp}${rand}`;
}

export function generateLicenseKey(): string {
  const raw = randomHex(8);
  return `YZL-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-VIP`;
}

export function loadOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder): void {
  if (typeof window === "undefined") return;
  const list = loadOrders();
  list.unshift(order);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(list.slice(0, 50)));
}

export function findOrders(query: string): StoredOrder[] {
  const q = query.trim();
  if (!q) return [];
  return loadOrders().filter(
    (o) =>
      o.orderNo.toUpperCase() === q.toUpperCase() ||
      o.customerContact === q ||
      o.orderNo.toUpperCase().includes(q.toUpperCase())
  );
}
