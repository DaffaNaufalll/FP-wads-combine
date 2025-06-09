import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line
  }, [id]);

  const fetchTicket = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`https://fp-backends-production.up.railway.app/api/tickets/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setTicket(data);
    setLoading(false);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("message", input);
    if (file) formData.append("file", file);

    const res = await fetch(`https://fp-backends-production.up.railway.app/api/tickets/${id}/reply`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData
    });
    if (res.ok) {
      setInput("");
      setFile(null);
      fetchTicket();
    }
    setSubmitting(false);
  };

  const handlePriorityChange = async (e) => {
    const newPriority = e.target.value;
    const token = localStorage.getItem("token");
    await fetch(`https://fp-backends-production.up.railway.app/api/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ priority: newPriority })
    });
    fetchTicket();
  };

  const handleClose = async () => {
    const token = localStorage.getItem("token");
    await fetch(`https://fp-backends-production.up.railway.app/api/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status: "Closed" })
    });
    fetchTicket();
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!ticket || ticket.message === "Ticket not found") return (
    <div className="p-8 text-center text-red-600">Ticket not found.</div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700">{ticket.subject || ticket.title}</h1>
          <Button variant="ghost" onClick={() => navigate("/view-tickets")}>
            &larr; Back to Tickets
          </Button>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {ticket.status}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Priority: {ticket.priority}
          </span>
          {ticket.status !== "Closed" && (
            <Button
              className="ml-4 bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded"
              type="button"
              onClick={handleClose}
            >
              Close Ticket
            </Button>
          )}
        </div>
        {/* Allow changing priority */}
        <div className="mb-4 flex items-center gap-2">
          <label className="mr-2 text-sm font-semibold">Change Priority:</label>
          <select
            value={ticket.priority}
            onChange={handlePriorityChange}
            className="border rounded px-2 py-1 text-sm"
            disabled={ticket.status === "Closed"}
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
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            disabled={ticket.status === "Closed" || submitting}
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="mb-2"
            disabled={ticket.status === "Closed" || submitting}
          />
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={ticket.status === "Closed" || submitting}
          >
            {submitting ? "Sending..." : "Send Reply"}
          </Button>
        </form>
      </div>
    </div>
  );
}