import axios from "axios";
import { useState } from "react";

export default function SendEmails() {
  const [resume, setResume] = useState(null);
  const [companies, setCompanies] = useState([
    { company: "", role: "", email: "", contact_name: "" },
  ]);
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

  const sendEmails = async () => {
    if (!resume) {
      setError("Please upload a resume");
      return;
    }

    const validCompanies = companies.filter((c) => c.company && c.email);
    if (validCompanies.length === 0) {
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
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
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
          <p className="text-green-800 font-bold">Emails Sent Successfully!</p>
          <p className="text-green-700">Sent: {result.sent}</p>
          {result.failed > 0 && <p className="text-red-700">Failed: {result.failed}</p>}
          <pre className="mt-2 bg-white p-2 rounded overflow-auto max-h-40 text-xs">
            {JSON.stringify(result.results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
