"use client";

import React, { useCallback, useState } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { RevenueDashboard } from "./RevenueDashboard";
import { ProductStore } from "./ProductStore";
import { QuantSignalsRadar } from "./QuantSignalsRadar";
import { MoneyMakerBlueprint } from "./MoneyMakerBlueprint";
import { RevenueSimulator } from "./RevenueSimulator";
import { PaymentStationSection } from "./PaymentStationSection";
import { CompanyFooter } from "./CompanyFooter";
import { PaymentHubModal } from "./PaymentHubModal";
import { ConsultationModal } from "./ConsultationModal";
import { OrderLookupModal } from "./OrderLookupModal";
import type { Product, QuantSignal } from "@/lib/site-data";
import type { RevenueStats } from "@/lib/stats";

interface HomeClientProps {
  initialProducts: Product[];
  initialSignals: QuantSignal[];
  initialStats: RevenueStats;
}

export function HomeClient({
  initialProducts,
  initialSignals,
  initialStats,
}: HomeClientProps) {
  // Modal states
  const [isPaymentHubOpen, setIsPaymentHubOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);

  // Selected product for checkout
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Live stats & refresh
  const [stats, setStats] = useState<RevenueStats>(initialStats);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenPaymentForProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsPaymentHubOpen(true);
  }, []);

  const handleOpenGeneralPayment = useCallback(() => {
    setSelectedProduct(null);
    setIsPaymentHubOpen(true);
  }, []);

  const handleOrderCompleted = useCallback(() => {
    // 订单已写入 localStorage，通知各面板刷新
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const todayRevenue = stats?.todayRevenue ?? 1297.9;
  const dailyTarget = stats?.dailyTarget ?? 1000;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenPaymentHub={handleOpenGeneralPayment}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        todayRevenue={todayRevenue}
        dailyTarget={dailyTarget}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenPaymentHub={handleOpenGeneralPayment}
          todayRevenue={todayRevenue}
          dailyTarget={dailyTarget}
        />

        {/* Daily 1000 Target Revenue Dashboard */}
        <RevenueDashboard
          onOpenPaymentHub={handleOpenGeneralPayment}
          onRefreshTrigger={refreshTrigger}
        />

        {/* High-Value Monetization Products Store */}
        <ProductStore
          products={initialProducts}
          onSelectProduct={handleOpenPaymentForProduct}
        />

        {/* Live AI Quant Signals & Radar */}
        <QuantSignalsRadar
          signals={initialSignals}
          onUnlockVip={handleOpenGeneralPayment}
        />

        {/* World-Class Wealth Generation Master Blueprint */}
        <MoneyMakerBlueprint
          onOpenPaymentHub={handleOpenGeneralPayment}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Interactive Revenue Simulator */}
        <RevenueSimulator onOpenPaymentHub={handleOpenGeneralPayment} />

        {/* Official crypto payment station (ETH, BTC) */}
        <PaymentStationSection />
      </main>

      {/* Corporate Credentials & Footer */}
      <CompanyFooter />

      {/* Payment Checkout Modal */}
      <PaymentHubModal
        isOpen={isPaymentHubOpen}
        onClose={() => setIsPaymentHubOpen(false)}
        presetAmount={selectedProduct ? selectedProduct.price : 299}
        presetProductId={selectedProduct ? selectedProduct.id : 2}
        onPaymentSuccess={handleOrderCompleted}
      />

      {/* 1-on-1 Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        onOpenPaymentHub={handleOpenGeneralPayment}
      />

      {/* Order & License Lookup Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
      />
    </div>
  );
}
