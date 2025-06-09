import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import { List } from "lucide-react";

// For CRA, use process.env.REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL;

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get real user info from localStorage (replace fallback with your auth logic if needed)
  const user = {
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email") || "",
    avatar:
      localStorage.getItem("avatar") ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        localStorage.getItem("name") || "User"
      )}&background=10b981&color=fff`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Optionally, you can remove this check if your backend uses JWT for auth
    // if (!user.email) {
    //   setError("User email not found. Please log in again.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await fetch(
        `${API_URL}/api/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            subject,
            description,
            priority
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        navigate("/view-tickets");
      } else {
        setLoading(false);
        setError(data.error || "Failed to create ticket");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-green-200 to-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg px-6 py-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-green-600 font-bold text-2xl">
            Tokopedia HelpDesk
          </span>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            to="/view-tickets"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded transition"
          >
            <List className="h-5 w-5" /> Requests
          </Link>
        </nav>
        <div className="mt-auto flex items-center gap-3 pt-10 border-t">
          <img
            src={user.avatar}
            alt="User"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-2">
            <span className="text-green-600 font-bold text-xl">
              Tokopedia HelpDesk
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/" className="text-green-700 hover:underline font-semibold">
              &larr; Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Form */}
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-10 w-full max-w-xl">
            <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
              Create New Ticket
            </h1>
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-green-700 font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-green-700 font-semibold">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-green-700 font-semibold">
                  Priority
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}