import axios from "axios";
import { useState } from "react";

export default function SendEmails() {
  const [resume, setResume] = useState(null);
  const [companies, setCompanies] = useState([
    { company: "", role: "", email: "", contact_name: "" },
  ]);
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [inputMode, setInputMode] = useState("manual"); // "manual" or "csv"
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCompanyChange = (index, field, value) => {
    const newCompanies = [...companies];
    newCompanies[index][field] = value;
    setCompanies(newCompanies);
  };

  const addCompany = () => {
    setCompanies([
      ...companies,
      { company: "", role: "", email: "", contact_name: "" },
    ]);
  };

  const removeCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const companyIndex = headers.findIndex(h => h.includes('company'));
    const roleIndex = headers.findIndex(h => h.includes('role'));
    const emailIndex = headers.findIndex(h => h.includes('email'));
    const contactIndex = headers.findIndex(h => h.includes('contact'));

    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      return {
        company: values[companyIndex] || '',
        role: values[roleIndex] || '',
        email: values[emailIndex] || '',
        contact_name: values[contactIndex] || '',
      };
    }).filter(company => company.company && company.email);
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      setError("Please select a CSV file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const parsedCompanies = parseCSV(csvText);
        if (parsedCompanies.length === 0) {
          setError("No valid companies found in CSV. Please check the format.");
          return;
        }
        setCompanies(parsedCompanies);
        setCsvData(parsedCompanies);
        setError(null);
      } catch (err) {
        setError("Error parsing CSV file: " + err.message);
      }
    };
    reader.readAsText(csvFile);
  };

  const sendEmails = async () => {
    if (!resume) {
      setError("Please upload a resume");
      return;
    }

    const validCompanies = inputMode === "csv" ? csvData : companies.filter((c) => c.company && c.email);
    if (!validCompanies || validCompanies.length === 0) {
      setError("Please add at least one company with email");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("companies", JSON.stringify(validCompanies));

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/send",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
      console.log("Emails sent:", res.data);
    } catch (err) {
      setError(err.message);
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Cold Emails</h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Upload Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Input Mode Toggle */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Choose Input Method</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setInputMode("manual")}
            className={`px-4 py-2 rounded ${
              inputMode === "manual"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setInputMode("csv")}
            className={`px-4 py-2 rounded ${
              inputMode === "csv"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upload CSV
          </button>
        </div>
      </div>

      {inputMode === "csv" ? (
        /* CSV Upload Mode */
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Upload Companies CSV</h3>
          <div className="border border-gray-200 rounded p-4 bg-gray-50">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="block w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleCsvUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Parse CSV
            </button>
            <p className="text-sm text-gray-600 mt-2">
              CSV should have columns: company, role, email, contact_name (optional)
            </p>
          </div>

          {csvData && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Parsed Companies ({csvData.length})</h4>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded">
                {csvData.map((company, index) => (
                  <div key={index} className="p-2 border-b border-gray-100 bg-white">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span><strong>Company:</strong> {company.company}</span>
                      <span><strong>Role:</strong> {company.role || "Not specified"}</span>
                      <span><strong>Email:</strong> {company.email}</span>
                      <span><strong>Contact:</strong> {company.contact_name || "Not specified"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Manual Entry Mode */
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Companies</h3>
          {companies.map((company, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded bg-gray-50"
            >
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company.company}
                  onChange={(e) =>
                    handleCompanyChange(index, "company", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={company.role}
                  onChange={(e) =>
                    handleCompanyChange(index, "role", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={company.email}
                  onChange={(e) =>
                    handleCompanyChange(index, "email", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Contact Name (Optional)"
                  value={company.contact_name}
                  onChange={(e) =>
                    handleCompanyChange(index, "contact_name", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              {companies.length > 1 && (
                <button
                  onClick={() => removeCompany(index)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addCompany}
            className="mt-2 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
          >
            + Add Company
          </button>
        </div>
      )}

      <button
        onClick={sendEmails}
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400 font-semibold"
      >
        {loading ? "Sending..." : "Send Emails"}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800 font-bold">Email Campaign Complete</p>
          <p className="text-green-700">✅ Sent: {result.sent}</p>
          {result.failed > 0 && (
            <>
              <p className="text-red-700">❌ Failed: {result.failed}</p>
              <div className="mt-2">
                <p className="text-red-800 font-semibold text-sm">Failure reasons:</p>
                {result.errors?.map((err, i) => (
                  <div key={i} className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    <strong>{err.company} ({err.email}):</strong> {err.error}
                  </div>
                ))}
              </div>
            </>
          )}
          {result.sent > 0 && (
            <pre className="mt-2 bg-white p-2 rounded overflow-auto max-h-40 text-xs">
              {JSON.stringify(result.results, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
