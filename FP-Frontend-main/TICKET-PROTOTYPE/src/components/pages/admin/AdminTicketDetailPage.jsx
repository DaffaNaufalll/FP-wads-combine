import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../ui/button";

const agentsList = [
  { id: 1, name: "Agent Smith" },
  { id: 2, name: "Agent Jane" },
];

export default function AdminTicketDetailPage() {
  const { id } = useParams();

  // All hooks at the top!
  const [ticket, setTicket] = useState({
    id,
    subject: "Refund request",
    user: "Lisa Goodman",
    status: "Open",
    priority: "High",
    agent: "",
    description: "Customer requests a refund for order #12345.",
    createdAt: "2025-06-01",
    messages: [
      { from: "user", text: "I want a refund.", time: "2025-06-01 10:00" },
      { from: "admin", text: "We are reviewing your request.", time: "2025-06-01 11:00" },
    ],
  });
  const [showStatus, setShowStatus] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [reply, setReply] = useState("");

  const isAdmin = localStorage.getItem("role") === "admin";
  if (!isAdmin) {
    window.location.href = "/login";
    return null;
  }

  const handleStatusChange = (e) => {
    setTicket({ ...ticket, status: e.target.value });
    setShowStatus(false);
  };

  const handlePriorityChange = (e) => {
    setTicket({ ...ticket, priority: e.target.value });
    setShowPriority(false);
  };

  const handleAgentChange = (e) => {
    setTicket({ ...ticket, agent: e.target.value });
    setShowAgent(false);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      setTicket({
        ...ticket,
        messages: [
          ...ticket.messages,
          { from: "admin", text: reply, time: new Date().toISOString().slice(0, 16).replace("T", " ") },
        ],
      });
      setReply("");
    }
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
        <Link to="/admin/tickets">
          <Button className="mb-4 ml-2">&larr; Back to Tickets</Button>
        </Link>
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
          <div className="mb-2 text-gray-600">From: {ticket.user}</div>
          <div className="mb-2 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{ticket.status}</span>
            <Button className="bg-blue-600 text-white px-2 py-1 text-xs" onClick={() => setShowStatus(!showStatus)}>
              Change Status
            </Button>
            {showStatus && (
              <select
                className="ml-2 border rounded px-2 py-1 text-xs"
                value={ticket.status}
                onChange={handleStatusChange}
                onBlur={() => setShowStatus(false)}
                autoFocus
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            )}
            <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">{ticket.priority}</span>
            <Button className="bg-yellow-500 text-white px-2 py-1 text-xs" onClick={() => setShowPriority(!showPriority)}>
              Change Priority
            </Button>
            {showPriority && (
              <select
                className="ml-2 border rounded px-2 py-1 text-xs"
                value={ticket.priority}
                onChange={handlePriorityChange}
                onBlur={() => setShowPriority(false)}
                autoFocus
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            )}
            <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              {ticket.agent ? `Agent: ${ticket.agent}` : "No Agent"}
            </span>
            <Button className="bg-green-600 text-white px-2 py-1 text-xs" onClick={() => setShowAgent(!showAgent)}>
              Assign Agent
            </Button>
            {showAgent && (
              <select
                className="ml-2 border rounded px-2 py-1 text-xs"
                value={ticket.agent}
                onChange={handleAgentChange}
                onBlur={() => setShowAgent(false)}
                autoFocus
              >
                <option value="">-- Select Agent --</option>
                {agentsList.map(agent => (
                  <option key={agent.id} value={agent.name}>{agent.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4 text-gray-700">{ticket.description}</div>
          <div className="mb-4 text-xs text-gray-400">Created: {ticket.createdAt}</div>
          <h2 className="font-semibold mb-2">Conversation</h2>
          <div className="bg-gray-50 rounded p-3 mb-4">
            {ticket.messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <span className="font-bold">{msg.from === "admin" ? "Admin" : ticket.user}:</span>
                <span className="ml-2">{msg.text}</span>
                <span className="ml-2 text-xs text-gray-400">{msg.time}</span>
              </div>
            ))}
          </div>
          {/* Reply box */}
          <form className="mt-6 flex gap-2" onSubmit={handleReply}>
            <input
              className="flex-1 border rounded px-2 py-1"
              placeholder="Reply as admin..."
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
            <Button className="bg-green-600 text-white" type="submit">Send</Button>
          </form>
        </div>
      </main>
    </div>
  );
}