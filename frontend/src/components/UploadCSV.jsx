import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(res.data);
      console.log("Upload successful:", res.data);
    } catch (err) {
      setError(err.message);
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Companies CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={uploadFile}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {error && <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>}

      {data && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800 font-bold">Upload Successful!</p>
          <p className="text-green-700">Records: {data.count}</p>
          <pre className="mt-2 bg-white p-2 rounded overflow-auto max-h-40 text-xs">
            {JSON.stringify(data.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
