import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    // Store credentials in localStorage
    localStorage.setItem("emailUser", email);
    localStorage.setItem("emailPass", password);

    // Call onLogin callback
    onLogin();

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Send Emails</h2>
        <p className="text-gray-600 mb-2 text-center">
          Enter your Gmail credentials to send emails. Your credentials are stored locally and used only for sending emails.
        </p>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Need an app password? Create one securely using the direct Google link below.
        </p>
        <p className="text-sm text-center mb-6">
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Generate a Gmail app password
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Gmail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="your-email@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">App Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Gmail app password"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://myaccount.google.com/apppasswords"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Generate an app password from your Google Account settings
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <a
                href="https://myaccount.google.com/security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Check your existing Google app passwords
              </a>
            </p>
          </div>

          {error && <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your credentials are stored locally in your browser and sent securely to our server for email sending.
          </p>
        </div>
      </div>
    </div>
  );
}