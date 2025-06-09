import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/tickets">
          <div className="bg-white rounded shadow p-6 hover:bg-green-50 cursor-pointer text-center">
            <div className="text-xl font-bold text-green-700 mb-2">Tickets</div>
            <div className="text-gray-600">View and manage all tickets</div>
          </div>
        </Link>
        <Link to="/admin/users">
          <div className="bg-white rounded shadow p-6 hover:bg-green-50 cursor-pointer text-center">
            <div className="text-xl font-bold text-green-700 mb-2">Users</div>
            <div className="text-gray-600">Manage users</div>
          </div>
        </Link>
        <Link to="/admin/agents">
          <div className="bg-white rounded shadow p-6 hover:bg-green-50 cursor-pointer text-center">
            <div className="text-xl font-bold text-green-700 mb-2">Agents</div>
            <div className="text-gray-600">View agent stats</div>
          </div>
        </Link>
        <Link to="/admin/reports">
          <div className="bg-white rounded shadow p-6 hover:bg-green-50 cursor-pointer text-center">
            <div className="text-xl font-bold text-green-700 mb-2">Reports</div>
            <div className="text-gray-600">Analytics and stats</div>
          </div>
        </Link>
        <Link to="/admin/settings">
          <div className="bg-white rounded shadow p-6 hover:bg-green-50 cursor-pointer text-center">
            <div className="text-xl font-bold text-green-700 mb-2">Settings</div>
            <div className="text-gray-600">Manage categories and canned responses</div>
          </div>
        </Link>
      </div>
      <Button
        className="mt-8 bg-red-500 hover:bg-red-600 text-white"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
    </div>
  );
}