import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminReportsPage() {
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const stats = {
    totalTickets: 100,
    open: 20,
    closed: 60,
    pending: 20,
    avgResponseTime: "2h 15m",
    satisfaction: "92%",
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
          <Link to="/admin/reports" className="font-semibold text-green-700">Reports</Link>
          <Link to="/admin/settings" className="hover:text-green-700">Settings</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Link to="/admin">
          <Button className="mb-4">&larr; Back to Dashboard</Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-700">{stats.totalTickets}</div>
            <div className="text-gray-600">Total Tickets</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.open}</div>
            <div className="text-gray-600">Open</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
            <div className="text-gray-600">Closed</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.avgResponseTime}</div>
            <div className="text-gray-600">Avg. Response Time</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.satisfaction}</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
        </div>
      </main>
    </div>
  );
}