import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";

const mockTicket = {
  id: 1,
  subject: "Shoe size question",
  status: "Open",
  priority: "High",
  messages: [
    { from: "user", text: "What size should I get for wide feet?", time: "2 hours ago" },
    { from: "agent", text: "We recommend one size up.", time: "1 hour ago" },
  ],
};

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockTicket.messages);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(mockTicket.status);
  const [priority, setPriority] = useState(mockTicket.priority);

  const handleReply = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { from: "user", text: input, time: "just now", file },
    ]);
    setInput("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700">{mockTicket.subject}</h1>
          <Button variant="ghost" onClick={() => navigate("/view-tickets")}>
            &larr; Back to Tickets
          </Button>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {status}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            Priority: {priority}
          </span>
          {status !== "Closed" && (
            <Button
              className="ml-4 bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded"
              onClick={() => setStatus("Closed")}
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
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
            disabled={status === "Closed"}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="space-y-4 mb-8">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === "user" ? "bg-green-100 text-right" : "bg-gray-100 text-left"}`}>
                <div>{msg.text}</div>
                {msg.file && (
                  <div className="mt-2">
                    <a href={URL.createObjectURL(msg.file)} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                      Attachment
                    </a>
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
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