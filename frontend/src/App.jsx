import UploadCSV from "./components/UploadCSV";
import SendEmails from "./components/SendEmails";
import { useState } from "react";

export default function App() {
  const [tab, setTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">🚀 AI Cold Mail Agent</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setTab("upload")}
              className={`p-2 rounded ${
                tab === "upload" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Upload CSV
            </button>
            <button
              onClick={() => setTab("send")}
              className={`p-2 rounded ${
                tab === "send" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Send Emails
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 mt-8">
        {tab === "upload" && <UploadCSV />}
        {tab === "send" && <SendEmails />}
      </div>
    </div>
  );
}
