import React from "react";
import {
  FaHome, FaUsers, FaMoneyCheckAlt, FaMapMarkedAlt,
  FaChartLine, FaCogs, FaCreditCard, FaWater, FaMoon, FaSun
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Sidebar({ toggleLang, toggleTheme, isDarkMode }) {
  const { t } = useTranslation();

  return (
    <div className="w-64 h-screen bg-indigo-700 text-white flex flex-col p-4 shadow-lg fixed z-30">
      {/* Logo & Title */}
      {/* Logo & Title */}
{/* Logo & Title */}
<div className="mb-10 flex items-center gap-3">
  <img src="/images/logon.png" alt="Logo" className="w-12 h-12 object-contain" />
  <h1 className="text-sm font-semibold leading-tight">
    Risk Analysis and <br /> Forecasting System
  </h1>
</div>

      {/* Menu Items */}
      <nav className="space-y-4 flex-1">
        <MenuItem icon={<FaHome />} label={t("Dashboard")} to="/" />
        <MenuItem icon={<FaUsers />} label={t("Customer departure")} to="/analysis/churn" />
        <MenuItem icon={<FaMoneyCheckAlt />} label={t("Financial fraud")} to="/analysis/fraud" />
        <MenuItem icon={<FaMapMarkedAlt />} label={t("Geographical risk")} to="/analysis/geo" />
        <MenuItem icon={<FaChartLine />} label={t("Market risks")} to="/analysis/market" />
        <MenuItem icon={<FaCogs />} label={t("Technology and Systems")} to="/analysis/operational" />
        <MenuItem icon={<FaCreditCard />} label={t("Credit risk")} to="/analysis/credit" />
        <MenuItem icon={<FaWater />} label={t("Liquidity risk")} to="/analysis/liquidity" />
      </nav>

      {/* Language + Theme Buttons */}
      <div className="mt-6 space-y-2">
        <button
          onClick={toggleLang}
          className="w-full bg-white text-indigo-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
        >
          🌐 {t("Change Language")}
        </button>
        <button
          onClick={toggleTheme}
          className="w-full bg-white text-indigo-700 font-semibold py-2 rounded hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
          {isDarkMode ? t("Light Mode") : t("Dark Mode")}
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, to }) {
  return (
    <a
      href={to}
      className="flex items-center gap-3 text-white hover:bg-indigo-800 p-2 rounded transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}