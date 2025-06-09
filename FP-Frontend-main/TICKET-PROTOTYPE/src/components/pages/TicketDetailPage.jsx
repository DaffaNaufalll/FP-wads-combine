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

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://fp-backends-production.up.railway.app/api/tickets/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setTicket(null);
      });
  }, [id]);

  const handleReply = (e) => {
    e.preventDefault();
    // Implement reply logic here if needed
    setInput("");
    setFile(null);
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
              // Implement close ticket logic if needed
              type="button"
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
            // Implement change priority logic if needed
            className="border rounded px-2 py-1 text-sm"
            disabled={ticket.status === "Closed"}
            readOnly
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
        {/* Placeholder for messages/replies */}
        <form onSubmit={handleReply} className="flex flex-col gap-2">
          <textarea
            className="border rounded px-3 py-2"
            rows={3}
            placeholder="Type your reply..."
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="mb-2"
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Send Reply
          </Button>
        </form>
      </div>
    </div>
  );
}