// Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie,
  Cell, Legend, ResponsiveContainer
} from "recharts";
import Swal from 'sweetalert2';

export default function Dashboard() {
  const [statsArray, setStatsArray] = useState([]);

  useEffect(() => {
    const keys = [
      { key: "churn", label: "مغادرة العملاء", color: "#3B82F6", field: "predicted_exit", storageKey: "churn_results" },
      { key: "fraud", label: "احتيال", color: "#EF4444", field: "fraud_prediction", storageKey: "fraud_results" },
      { key: "market", label: "السوق", color: "#8B5CF6", field: "market_risk_prediction", storageKey: "market_results" },
      { key: "liquidity", label: "السيولة", color: "#10B981", field: "liquidity_risk_prediction", storageKey: "liquidity_results" },
      { key: "operational", label: "تشغيلية", color: "#FACC15", field: "op_risk_prediction", storageKey: "operational_results" },
      { key: "credit", label: "ائتمان", color: "#6366F1", field: "credit_risk_prediction", storageKey: "credit_results" },
      { key: "geo", label: "جغرافي", color: "#EC4899", field: "geo_risk_prediction", storageKey: "geo_results" },
    ];

    const updatedStats = keys.map(({ storageKey, label, color, field }) => {
      const raw = localStorage.getItem(storageKey);
      let count = 0;
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            count = parsed.filter((r) => r[field] === 1).length;
          }
        } catch (e) {
          console.error(`Error parsing ${storageKey}`, e);
        }
      }
      return { label, value: count, color };
    });

    setStatsArray(updatedStats);
  }, []);

  const clearLocalStorage = () => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سيتم مسح بيانات التحليلات من الذاكرة!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const keysToClear = [
          "churn_results", "fraud_results", "market_results",
          "liquidity_results", "operational_results",
          "credit_results", "geo_results"
        ];

        keysToClear.forEach((key) => localStorage.removeItem(key));
        new Audio(process.env.PUBLIC_URL + "/sounds/successed-295058.mp3").play();
        Swal.fire({
          title: 'تم التحديث!',
          text: 'تم مسح البيانات بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">لوحة مؤشرات المخاطر الشاملة</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statsArray.map((stat, idx) => (
          <div key={idx} className="bg-white shadow rounded p-4 text-center">
            <h2 className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">عدد الحالات حسب نوع المخاطر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsArray}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {statsArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">توزيع المخاطر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statsArray} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100} label>
                {statsArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* زر التحديث */}
      <button
        onClick={clearLocalStorage}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition"
      >
        🔄 تحديث الإحصائيات
      </button>
    </div>
  );
}
