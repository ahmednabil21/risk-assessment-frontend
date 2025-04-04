import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Dashboard from "./pages/Dashboard";
import ChurnAnalysis from "./pages/ChurnAnalysis";
import FraudAnalysis from "./pages/FraudAnalysis";
import GeoAnalysis from "./pages/GeoAnalysis";
import OperationalAnalysis from "./pages/OperationalAnalysis";
import MarketAnalysis from "./pages/MarketAnalysis";
import CreditAnalysis from "./pages/CreditAnalysis";
import LiquidityAnalysis from "./pages/LiquidityAnalysis";
import Loader from "./components/PageLoader"; // ⬅️ أضف اللودر هنا

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // ⏳ مدة التحميل
    return () => clearTimeout(timer);
  }, [location.pathname]); // يتغير عند كل تغيير صفحة

  if (loading) return <Loader />;

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analysis/churn" element={<ChurnAnalysis />} />
          <Route path="/analysis/fraud" element={<FraudAnalysis />} />
          <Route path="/analysis/geo" element={<GeoAnalysis />} />
          <Route path="/analysis/operational" element={<OperationalAnalysis />} />
          <Route path="/analysis/market" element={<MarketAnalysis />} />
          <Route path="/analysis/credit" element={<CreditAnalysis />} />
          <Route path="/analysis/liquidity" element={<LiquidityAnalysis />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}