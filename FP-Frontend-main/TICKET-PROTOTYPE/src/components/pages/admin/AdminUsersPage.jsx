import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://fp-backends-production.up.railway.app/api/users/admin/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleToggleActive = async (userId, isActive) => {
    try {
      await fetch(
        `https://fp-backends-production.up.railway.app/api/users/admin/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ active: !isActive }),
        }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, active: !isActive } : u
        )
      );
    } catch (err) {
      alert("Failed to update user status.");
    }
  };

  return (
    <div className="p-8">
      <Link to="/admin">
        <Button className="mb-4">&larr; Back to Dashboard</Button>
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-green-700">All Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Active</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                  <td className="px-4 py-2 border-b">
                    {user.active ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className={`px-3 py-1 rounded text-white ${
                        user.active
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      onClick={() => handleToggleActive(user._id, user.active)}
                    >
                      {user.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}