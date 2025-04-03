// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChurnAnalysis from "./pages/ChurnAnalysis";
import FraudAnalysis from "./pages/FraudAnalysis";
import GeoAnalysis from "./pages/GeoAnalysis";
import OperationalAnalysis from "./pages/OperationalAnalysis";
import MarketAnalysis from "./pages/MarketAnalysis";
import CreditAnalysis from "./pages/CreditAnalysis";
import LiquidityAnalysis from "./pages/LiquidityAnalysis";
import Navbar from "./components/Navbar";

function App() {
  const [riskStats, setRiskStats] = useState({
    churn: 0,
    fraud: 0,
    geo: 0,
    operational: 0,
    market: 0,
    credit: 0,
    liquidity: 0,
  });

  useEffect(() => {
    const keys = ["churn", "fraud", "geo", "operational", "market", "credit", "liquidity"];
    const updatedStats = {};
    keys.forEach((key) => {
      const raw = localStorage.getItem(`${key}_results`);
      if (raw) {
        const parsed = JSON.parse(raw);
        const count = parsed.filter((r) => r[`${key}_prediction`] === 1).length;
        updatedStats[key] = count;
      }
    });
    setRiskStats(updatedStats);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard stats={riskStats} />} />
        <Route path="/analysis/churn" element={<ChurnAnalysis />} />
        <Route path="/analysis/fraud" element={<FraudAnalysis />} />
        <Route path="/analysis/geo" element={<GeoAnalysis />} />
        <Route path="/analysis/operational" element={<OperationalAnalysis />} />
        <Route path="/analysis/market" element={<MarketAnalysis />} />
        <Route path="/analysis/credit" element={<CreditAnalysis />} />
        <Route path="/analysis/liquidity" element={<LiquidityAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;