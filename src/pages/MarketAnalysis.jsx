import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function MarketAnalysis() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("يرجى اختيار ملف");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "market_risk");

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setData(res.data);
      // ✅ تخزين النتائج لتحديث الإحصائيات في الـ Dashboard
      localStorage.setItem("market_results", JSON.stringify(res.data));
    } catch (err) {
      alert("حدث خطأ أثناء رفع الملف");
      console.error(err);
    }
  };

  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
      }))
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">تحليل مخاطر السوق</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <input type="file" onChange={handleFileChange} className="border rounded p-2" />
        <button
          onClick={handleUpload}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          رفع وتحليل
        </button>
      </div>

      {data.length > 0 && (
        <DataTable
          title="نتائج تحليل مخاطر السوق"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
        />
      )}
    </div>
  );
}
