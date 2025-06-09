import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://fp-backends-production.up.railway.app/api/tickets/admin/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        setTickets([]);
      }
      setLoading(false);
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-green-700">All Tickets</h1>
      {loading ? (
        <div>Loading...</div>
      ) : tickets.length === 0 ? (
        <div>No tickets found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Subject</th>
                <th className="px-4 py-2 border-b">User</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Priority</th>
                <th className="px-4 py-2 border-b">Created</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="px-4 py-2 border-b">{ticket.subject}</td>
                  <td className="px-4 py-2 border-b">
                    {ticket.user?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-2 border-b">{ticket.status}</td>
                  <td className="px-4 py-2 border-b">{ticket.priority}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Link
                      to={`/admin/tickets/${ticket._id}`}
                      className="text-green-700 underline"
                    >
                      View
                    </Link>
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