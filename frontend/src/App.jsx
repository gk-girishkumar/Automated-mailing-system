import UploadCSV from "./components/UploadCSV";
import SendEmails from "./components/SendEmails";
import Login from "./components/Login";
import { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("upload");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const emailUser = localStorage.getItem("emailUser");
    const emailPass = localStorage.getItem("emailPass");
    if (emailUser && emailPass) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("emailUser");
    localStorage.removeItem("emailPass");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">🚀 AI Cold Mail Agent</h1>
          <div className="flex gap-4 items-center">
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
            <button
              onClick={handleLogout}
              className="ml-auto bg-red-500 hover:bg-red-600 p-2 rounded text-white"
            >
              Logout
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
