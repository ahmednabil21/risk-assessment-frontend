import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { FaUpload, FaFilter, FaSearch } from "react-icons/fa";

export default function AnalysisTemplate({ title, type, color, predictionField, requiredFields }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const handleUpload = async () => {
    if (!file) return alert("يرجى اختيار ملف");

    // ✅ عرض الشروط قبل التحليل
    const confirm = await Swal.fire({
      title: "تأكيد رفع الملف",
      html: `
        <div style="text-align:right;direction:rtl">
          <p>عدد الحقول المطلوب: <strong>${requiredFields.length}</strong></p>
          <p>أسماء الحقول:</p>
          <ul>
            ${requiredFields.map((field) => `<li>${field}</li>`).join("")}
          </ul>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "رفع وتحليل",
      cancelButtonText: "إلغاء",
    });

    if (!confirm.isConfirmed) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setData(res.data);
      setFilteredData(res.data);

      // ✅ إصلاح التخزين في localStorage بإسم مناسب
      const keyMap = {
        churn: "churn_results",
        fraud: "fraud_results",
        geo_risk: "geo_results",
        operational_risk: "operational_results",
        market_risk: "market_results",
        credit_risk: "credit_results",
        liquidity_risk: "liquidity_results",
      };
      const storageKey = keyMap[type] || `${type}_results`;
      localStorage.setItem(storageKey, JSON.stringify(res.data));
    } catch (err) {
      alert("حدث خطأ أثناء رفع الملف");
      console.error(err);
    }
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    if (option === "all") {
      setFilteredData(data);
    } else {
      const val = option === "exited" ? 1 : 0;
      const filtered = data.filter((row) => row[predictionField] === val);
      setFilteredData(filtered);
    }
  };

  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => ({
          name: key,
          selector: (row) => row[key],
          sortable: true,
          wrap: true,
        }))
      : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className={`text-3xl font-bold mb-6 text-${color}-600 text-center`}>{title}</h2>

      <div className="flex flex-col md:flex-row justify-end items-center gap-3 mb-6">
  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    className="border border-gray-300 p-2 rounded w-full md:w-auto"
  />
  <button
    onClick={handleUpload}
    className="flex items-center gap-2 bg-[#4f45e4] hover:bg-[#3e35c7] text-white font-semibold py-2 px-4 rounded transition"
  >
    <FaUpload /> Analyze
  </button>
  <button
    onClick={() => handleFilter("all")}
    className="flex items-center gap-2 bg-[#4f45e4] hover:bg-[#3e35c7] text-white font-semibold py-2 px-4 rounded transition"
  >
    <FaSearch /> All
  </button>
  <button
    onClick={() => handleFilter("exited")}
    className="flex items-center gap-2 bg-[#4f45e4] hover:bg-[#3e35c7] text-white font-semibold py-2 px-4 rounded transition"
  >
    <FaFilter /> Exited Only
  </button>
  <button
    onClick={() => handleFilter("not_exited")}
    className="flex items-center gap-2 bg-[#4f45e4] hover:bg-[#3e35c7] text-white font-semibold py-2 px-4 rounded transition"
  >
    <FaFilter /> Not Exited
  </button>
</div>

      {filteredData.length > 0 && (
        <div className="bg-white shadow rounded p-4">
          <DataTable
            title="نتائج التحليل"
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
          />
        </div>
      )}
    </div>
  );
}