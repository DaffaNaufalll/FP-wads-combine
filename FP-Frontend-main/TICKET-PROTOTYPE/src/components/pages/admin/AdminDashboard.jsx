import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

const tickets = [
  { id: 1, subject: "Refund request", user: "Lisa Goodman", status: "Open", priority: "High", createdAt: "2025-06-01" },
  { id: 2, subject: "Order #345098", user: "John Doe", status: "Pending", priority: "Medium", createdAt: "2025-05-29" },
  { id: 3, subject: "Feedback", user: "Lisa Goodman", status: "Closed", priority: "Low", createdAt: "2025-05-20" },
];

const users = [
  { id: 1, name: "Lisa Goodman", email: "lisagoodman@mail.com", active: true },
  { id: 2, name: "John Doe", email: "john.doe@email.com", active: true },
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

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const filteredTickets = tickets.filter(t =>
    (filterStatus === "All" || t.status === filterStatus) &&
    (t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()))
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold text-green-600">Tokopedia Helpdesk</span>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          <Link to="/admin" className="font-semibold text-green-700">Dashboard</Link>
          <Link to="/admin/tickets" className="hover:text-green-700">All Tickets</Link>
          <Link to="/admin/users" className="hover:text-green-700">Users</Link>
          <Link to="/admin/agents" className="hover:text-green-700">Agents</Link>
          <Link to="/admin/reports" className="hover:text-green-700">Reports</Link>
          <Link to="/admin/settings" className="hover:text-green-700">Settings</Link>
          <Button className="mt-8 bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>Logout</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{tickets.filter(t => t.status === "Open").length}</div>
            <div className="text-gray-600">Open Tickets</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === "Pending").length}</div>
            <div className="text-gray-600">Pending Tickets</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-2xl font-bold text-gray-600">{tickets.filter(t => t.status === "Closed").length}</div>
            <div className="text-gray-600">Closed Tickets</div>
          </div>
        </div>
        {/* Ticket List */}
        <div className="bg-white rounded-xl shadow border mb-8">
          <div className="flex items-center gap-4 p-4 border-b">
            <input
              type="text"
              placeholder="Search tickets or users..."
              className="border rounded px-3 py-2 text-sm flex-1"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-2 py-1 text-sm"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{ticket.subject}</td>
                  <td className="px-4 py-3">{ticket.user}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">{ticket.createdAt}</td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/ticket/${ticket.id}`} className="text-blue-600 hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link to="/admin/users" className="text-blue-600 hover:underline">Manage all users &rarr;</Link>
          </div>
        </div>
        {/* User Management Preview */}
        <div className="bg-white rounded-xl shadow border p-6">
          <h2 className="text-xl font-bold mb-4 text-green-700">Users</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link to="/admin/users" className="text-blue-600 hover:underline">Manage all users &rarr;</Link>
          </div>
        </div>
      </main>
    </div>
  );
}