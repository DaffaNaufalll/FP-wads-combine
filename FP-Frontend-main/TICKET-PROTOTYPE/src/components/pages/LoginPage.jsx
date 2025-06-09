import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://fp-backends-production.up.railway.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        // Save login info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        // Optionally save name/avatar if returned by API
        if (data.name) localStorage.setItem("name", data.name);
        if (data.avatar) localStorage.setItem("avatar", data.avatar);

        setLoading(false);

        // Redirect by role!
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setLoading(false);
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-white">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-10 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Login</h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-green-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}