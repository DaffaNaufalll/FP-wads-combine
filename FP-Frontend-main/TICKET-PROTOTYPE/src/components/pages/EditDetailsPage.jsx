import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function EditDetailsPage() {
  const navigate = useNavigate();
  // Replace with real user data
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    navigate("/"); // Go back to dashboard after saving
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-white flex flex-col">
      <header className="bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
        <span className="text-green-600 font-bold text-xl">Tokopedia HelpDesk</span>
        <Button
          className="text-green-700 hover:underline font-semibold"
          variant="ghost"
          onClick={() => navigate("/")}
        >
          &larr; Back to Dashboard
        </Button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-10 w-full max-w-md mt-12">
          <h1 className="text-2xl font-bold mb-6 text-green-700">Edit My Details</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-green-700 font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md" type="submit">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}