import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4 flex-wrap justify-center">
      <Link to="/" className="hover:underline">لوحة التحكم</Link>
      <Link to="/analysis/churn" className="hover:underline">مغادرة العملاء</Link>
      <Link to="/analysis/fraud" className="hover:underline">الاحتيال المالي</Link>
      <Link to="/analysis/geo" className="hover:underline">الأمان الجغرافي</Link>
      <Link to="/analysis/operational" className="hover:underline">المخاطر التشغيلية</Link>
      <Link to="/analysis/market" className="hover:underline">مخاطر السوق</Link>
      <Link to="/analysis/credit" className="hover:underline">مخاطر الائتمان</Link>
      <Link to="/analysis/liquidity" className="hover:underline">مخاطر السيولة</Link>
    </nav>
  );
}