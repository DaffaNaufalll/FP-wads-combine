import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Lisa Goodman", email: "lisagoodman@mail.com", active: true },
    { id: 2, name: "John Doe", email: "john.doe@email.com", active: false },
  ]);
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const toggleActive = (id) => {
    setUsers(users =>
      users.map(u => u.id === id ? { ...u, active: !u.active } : u)
    );
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
          <Link to="/admin/users" className="font-semibold text-green-700">Users</Link>
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
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <table className="min-w-full bg-white rounded-xl shadow border">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2"></th>
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
                <td className="px-4 py-2">
                  <Button
                    className={user.active ? "bg-gray-400 text-white" : "bg-green-600 text-white"}
                    onClick={() => toggleActive(user.id)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}