import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const tickets = [
  { id: 1, subject: "Refund request", user: "Lisa Goodman", status: "Open", priority: "High", createdAt: "2025-06-01" },
  { id: 2, subject: "Order #345098", user: "John Doe", status: "Pending", priority: "Medium", createdAt: "2025-05-29" },
  { id: 3, subject: "Feedback", user: "Lisa Goodman", status: "Closed", priority: "Low", createdAt: "2025-05-20" },
];

function statusColor(status) {
  switch (status) {
    case "Open": return "bg-blue-100 text-blue-700";
    case "Closed": return "bg-gray-300 text-gray-600";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

function priorityColor(priority) {
  switch (priority) {
    case "High": return "bg-red-100 text-red-700";
    case "Medium": return "bg-yellow-100 text-yellow-700";
    case "Low": return "bg-green-100 text-green-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

export default function AdminTicketsPage() {
  const isAdmin = localStorage.getItem("role") === "admin";
  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold text-green-600">Tokopedia Helpdesk</span>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          <Link to="/admin" className="hover:text-green-700">Dashboard</Link>
          <Link to="/admin/tickets" className="font-semibold text-green-700">All Tickets</Link>
          <Link to="/admin/users" className="hover:text-green-700">Users</Link>
          <Link to="/admin/agents" className="hover:text-green-700">Agents</Link>
          <Link to="/admin/reports" className="hover:text-green-700">Reports</Link>
          <Link to="/admin/settings" className="hover:text-green-700">Settings</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Link to="/admin">
          <Button className="mb-4">&larr; Back to Dashboard</Button>
        </Link>
        <h1 className="text-2xl font-bold mb-6">All Tickets</h1>
        <table className="min-w-full bg-white rounded-xl shadow border">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{ticket.subject}</td>
                <td className="px-4 py-2">{ticket.user}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-2">{ticket.createdAt}</td>
                <td className="px-4 py-2">
                  <Link to={`/admin/ticket/${ticket.id}`} className="text-blue-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}