import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie,
  Cell, Legend, ResponsiveContainer
} from "recharts";
import Swal from "sweetalert2";

export default function Dashboard() {
  const [statsArray, setStatsArray] = useState([]);

  useEffect(() => {
    const keys = [
      { key: "churn", label: "Customer departure", color: "#3B82F6", field: "predicted_exit", storageKey: "churn_results" },
      { key: "fraud", label: "financial fraud", color: "#EF4444", field: "fraud_prediction", storageKey: "fraud_results" },
      { key: "geo", label: "Geographical risk", color: "#EC4899", field: "geo_risk_prediction", storageKey: "geo_results" },
      { key: "operational", label: "Technology and Systems", color: "#FACC15", field: "op_risk_prediction", storageKey: "operational_results" },
      { key: "market", label: "Market risks", color: "#8B5CF6", field: "market_risk_prediction", storageKey: "market_results" },
      { key: "credit", label: "Credit risk", color: "#6366F1", field: "credit_risk_prediction", storageKey: "credit_results" },
      { key: "liquidity", label: "Liquidity risk", color: "#10B981", field: "liquidity_risk_prediction", storageKey: "liquidity_results" },
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

  const handleClearData = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف جميع بيانات التحليل!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذفها",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const keysToClear = [
          "churn_results", "fraud_results", "market_results",
          "liquidity_results", "operational_results", "credit_results", "geo_results"
        ];
        keysToClear.forEach((key) => localStorage.removeItem(key));

        const audio = document.getElementById("success-sound");
        if (audio) audio.play();

        Swal.fire("تم الحذف!", "تم مسح البيانات بنجاح.", "success");
        setTimeout(() => window.location.reload(), 600);
      }
    });
  };

  return (
    <div className="bg-[#e7edf9] min-h-screen p-8 ml-64 relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#3b2c8d]">Risk Analysis and Forecasting</h1>

      {/* البطاقات */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {statsArray.map((stat, idx) => (
          <div
            key={idx}
            className="relative bg-[#5a4bd6] text-white px-4 py-6 rounded-md shadow-md font-semibold text-center text-lg"
            style={{ boxShadow: "6px 6px 0px #FBBF24" }}
          >
            <div>{stat.label}</div>
            <div className="text-3xl font-bold mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* الرسوم البيانية */}
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
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">توزيع المخاطر</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statsArray}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
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
        onClick={handleClearData}
        className="fixed bottom-6 right-6 bg-[#3b2c8d] hover:bg-[#2d236b] text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300"
      >
        🔄 تحديث الإحصائيات
      </button>
      

      {/* صوت النجاح */}
      <audio id="success-sound" src="/sounds/successed-295058.mp3" preload="auto" />
    </div>
  );
}
