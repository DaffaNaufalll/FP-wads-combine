import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminAgentsPage() {
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const agents = [
    { id: 1, name: "Agent Smith", tickets: 12, performance: "Good" },
    { id: 2, name: "Agent Jane", tickets: 8, performance: "Excellent" },
  ];

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
          <Link to="/admin/agents" className="font-semibold text-green-700">Agents</Link>
          <Link to="/admin/reports" className="hover:text-green-700">Reports</Link>
          <Link to="/admin/settings" className="hover:text-green-700">Settings</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Link to="/admin">
          <Button className="mb-4">&larr; Back to Dashboard</Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">Agent Management</h1>
        <table className="min-w-full bg-white rounded-xl shadow border">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Tickets Assigned</th>
              <th className="px-4 py-2 text-left">Performance</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id} className="border-b">
                <td className="px-4 py-2">{agent.name}</td>
                <td className="px-4 py-2">{agent.tickets}</td>
                <td className="px-4 py-2">{agent.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}