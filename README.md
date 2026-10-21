# 盈指量官网 · yingzhiliang-web

盈指量杭州科技有限公司官网 —— AI 量化搞钱系统与高胜率决策中心。
**Next.js 16 纯静态导出（`output: "export"`），适配 Cloudflare Pages 静态托管，零服务端依赖。**

## 快速开始

```bash
npm install
npm run dev        # 本地开发 http://localhost:3000
npm run build      # 产出静态站点到 out/（直接上传 Cloudflare Pages 即可）
npm run typecheck  # TypeScript 校验
```

> 注：在带批量删除保护的沙箱环境中执行 `npm run build` 时，若 Next 清理 `.next` 缓存被拦截，
> 可临时加环境变量执行：`CODEBUDDY_SAFE_DELETE_ENABLED=0 npm run build`（仅影响构建缓存清理）。

## 架构说明

| 层 | 文件 | 说明 |
| --- | --- | --- |
| 多语言框架 | `src/lib/i18n.tsx` | 18 语言词典 + `I18nProvider` / `useI18n`，`{var}` 插值，RTL 支持（阿拉伯语），localStorage 记忆语言 |
| 静态数据 | `src/lib/site-data.ts` | 收款账户、产品目录、量化信号、演示订单流水（非本地化字段） |
| 本地订单 | `src/lib/orders.ts` | localStorage 订单/激活码生成与查询（替代原 PostgreSQL 后端） |
| 营收统计 | `src/lib/stats.ts` | 演示订单 + 本地订单汇总，替代原 `/api/stats`、`/api/orders` |
| 页面 | `src/app/layout.tsx` / `page.tsx` | metadata + 静态首页渲染 |
| 组件 | `src/components/*` | 15 个组件（见下） |

### 与原数据库版的关键差异

- **无服务端**：删除 drizzle/postgres 与全部 `/api/*` 路由，改为纯客户端 + 静态数据
- **二维码**：`QrImage` 组件用 `qrcode` 包在浏览器端生成 dataURL（替代 `/api/qr`）
- **下单核销**：`PaymentCards` 本地生成订单号 + 激活码，写入 localStorage，即时展示交付结果
- **订单查询**：`OrderLookupModal` 查询本地订单 + 演示订单流水（`YZL20260821001~003`）
- **咨询预约**：`ConsultationModal` 保存到 localStorage
- **收益看板**：初始统计由 `DEMO_ORDERS` 构建期计算，刷新时并入本地订单

### 18 语言支持

| 完整翻译 | 核心 UI 翻译（长文回退英文） |
| --- | --- |
| 简体中文 (zh-CN)、English (en) | 繁體中文、日本語、한국어、Français、Deutsch、Español、Português、Italiano、Nederlands、Русский、Türkçe、العربية (RTL)、ไทย、Tiếng Việt、Bahasa Indonesia、हिन्दी |

- 核心 UI（导航 / Hero / 栏目标题 / 产品名 / 支付页签 / 页脚品牌等）已本地化
- 长文内容按 fallback 链回退：zh-TW → zh-CN，其余 → en
- 新增文案只需在 `zhCN` 与 `en` 两个字典补 key，其余语言自动继承

## 目录结构

```
public/downloads/          # 下单后交付的演示文件（.pine 指标 / .py 机器人）
src/app/                   # layout / page / globals.css
src/components/            # 15 个组件
src/lib/                   # i18n / site-data / orders / stats
```

## 部署（Cloudflare Pages）

```bash
npm run build
# 构建输出目录：out
```

## 组件清单

Navbar（导航+实时营收 ticker+语言切换）、HeroSection、RevenueDashboard（营收大屏+订单流水）、
ProductStore（6 大产品矩阵）、QuantSignalsRadar（5 条多市场信号）、MoneyMakerBlueprint（日赚千元作战图）、
RevenueSimulator（收益测算器）、PaymentStationSection（三通道收款码矩阵）、PaymentCards（收银台+核销表单）、
PaymentHubModal、ConsultationModal（1对1 预约）、OrderLookupModal（订单/激活码查询）、CompanyFooter、
LanguageSwitcher、QrImage（客户端二维码）。
