import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminTicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line
  }, [id]);

  const fetchTicket = async () => {
    setLoading(true);
    const res = await fetch(
      `https://fp-backends-production.up.railway.app/api/tickets/admin/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await res.json();
    setTicket(data);
    setLoading(false);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    await fetch(
      `https://fp-backends-production.up.railway.app/api/tickets/admin/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    fetchTicket();
  };

  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;
    await fetch(
      `https://fp-backends-production.up.railway.app/api/tickets/admin/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ priority: newPriority }),
      }
    );
    fetchTicket();
  };

  const handleReply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("message", reply);
    if (file) formData.append("file", file);

    await fetch(
      `https://fp-backends-production.up.railway.app/api/tickets/admin/${id}/reply`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );
    setReply("");
    setFile(null);
    setSubmitting(false);
    fetchTicket();
  };

  if (loading)
    return <div className="p-8 text-center">Loading...</div>;
  if (!ticket || ticket.message === "Ticket not found")
    return (
      <div className="p-8 text-center text-red-600">Ticket not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border p-8">
        <Link to="/admin">
          <Button className="mb-4">&larr; Back to Dashboard</Button>
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700">
            {ticket.subject || ticket.title}
          </h1>
          <button
            className="text-green-700 underline"
            onClick={() => navigate("/admin/tickets")}
          >
            &larr; Back to Tickets
          </button>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {ticket.status}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Priority: {ticket.priority}
          </span>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="mr-2 text-sm font-semibold">Change Status:</label>
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option>Open</option>
            <option>Pending</option>
            <option>Closed</option>
          </select>
          <label className="ml-4 mr-2 text-sm font-semibold">
            Change Priority:
          </label>
          <select
            value={ticket.priority}
            onChange={handlePriorityChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="mb-8">
          <div className="bg-green-50 p-4 rounded mb-2">
            {ticket.description}
          </div>
          <div className="text-xs text-gray-500">
            Submitted by: {ticket.user?.name} ({ticket.user?.email})
          </div>
        </div>
        {/* Replies Section */}
        {ticket.replies && ticket.replies.length > 0 && (
          <div className="mb-8">
            <div className="font-semibold mb-2 text-gray-700">Conversation</div>
            {ticket.replies.map((reply, idx) => (
              <div key={reply._id || idx} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-green-700">
                    {reply.user?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-100 rounded px-4 py-2">
                  {reply.message}
                  {reply.fileUrl && (
                    <div className="mt-2">
                      <a
                        href={reply.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-xs"
                      >
                        View Attachment
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleReply} className="flex flex-col gap-2">
          <textarea
            className="border rounded px-3 py-2"
            rows={3}
            placeholder="Type your reply..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            required
            disabled={submitting}
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="mb-2"
            disabled={submitting}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Reply"}
          </button>
        </form>
      </div>
    </div>
  );
}