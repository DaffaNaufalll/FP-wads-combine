import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminSettingsPage() {
  const [categories, setCategories] = useState(["Refund", "Order", "Shipping"]);
  const [newCategory, setNewCategory] = useState("");
  const [responses, setResponses] = useState([
    "Thank you for contacting us.",
    "We are looking into your issue.",
  ]);
  const [newResponse, setNewResponse] = useState("");
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const addResponse = () => {
    if (newResponse.trim()) {
      setResponses([...responses, newResponse.trim()]);
      setNewResponse("");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold text-green-600">Tokopedia Helpdesk</span>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          <Link to="/admin" className="hover:text-green-700">Dashboard</Link>
          <Link to="/admin/tickets" className="hover:text-green-700">All Tickets</Link>
          <Link to="/admin/users" className="hover:text-green-700">Users</Link>
          <Link to="/admin/agents" className="hover:text-green-700">Agents</Link>
          <Link to="/admin/reports" className="hover:text-green-700">Reports</Link>
          <Link to="/admin/settings" className="font-semibold text-green-700">Settings</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Link to="/admin">
          <Button className="mb-4">&larr; Back to Dashboard</Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="font-semibold mb-2">Categories</h2>
          <ul className="mb-2">
            {categories.map((cat, idx) => (
              <li key={idx} className="mb-1">{cat}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1"
              placeholder="Add category"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <Button className="bg-green-600 text-white" onClick={addCategory}>
              Add
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-2">Canned Responses</h2>
          <ul className="mb-2">
            {responses.map((res, idx) => (
              <li key={idx} className="mb-1">{res}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1"
              placeholder="Add canned response"
              value={newResponse}
              onChange={e => setNewResponse(e.target.value)}
            />
            <Button className="bg-green-600 text-white" onClick={addResponse}>
              Add
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}