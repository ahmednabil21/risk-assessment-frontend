import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function GeoAnalysis() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleUpload = async () => {
    if (!file) return alert("يرجى اختيار ملف");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "geo_risk");

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setData(res.data);

      // ✅ تخزين النتائج في localStorage
      localStorage.setItem("geo_results", JSON.stringify(res.data));
    } catch (err) {
      alert("حدث خطأ أثناء رفع الملف");
      console.error(err);
    }
  };

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          name: key,
          selector: (row) => row[key],
          sortable: true,
        }))
      : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">تحليل الأمان الجغرافي</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          رفع وتحليل
        </button>
      </div>
      <DataTable title="نتائج التحليل" columns={columns} data={data} pagination />
    </div>
  );
}
