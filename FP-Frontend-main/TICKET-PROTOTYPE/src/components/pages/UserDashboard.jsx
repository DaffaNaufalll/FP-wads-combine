import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, Plus, List } from "lucide-react";
import { getTickets } from "../../api";

export default function UserDashboard() {
  // Chatbot state
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Example summary data
  const summary = {
    pending: 7,
    onHold: 4,
    completed: 15,
  };

  // Chatbot send handler
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://fp-backends-production.up.railway.app/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: data.reply || "Sorry, I couldn't understand that." }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "AI service error." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <div className="text-2xl font-bold text-green-700 mb-8">Tokopedia HelpDesk</div>
          <nav>
            <Link to="/view-tickets" className="flex items-center gap-2 mb-4 text-green-700 font-semibold">
              <List className="w-5 h-5" /> Requests
            </Link>
          </nav>
          <div className="mt-auto pt-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-lg">
                JD
              </div>
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">john.doe@email.com</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-green-700 mb-2">
              Welcome to Tokopedia HelpDesk
            </h1>
            <div className="text-lg text-gray-700 mb-8">How can we help you?</div>
            <input
              type="text"
              placeholder="Search requests, templates, and tickets"
              className="w-full max-w-xl px-6 py-3 rounded-full border border-gray-300 mb-8 text-lg shadow"
            />
            <div>
              <Link to="/create-ticket">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow">
                  + Create an issue
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Card className="w-96 shadow-lg">
              <CardContent className="p-6">
                <div className="text-xl font-bold text-green-700 mb-4">My Summary</div>
                <div className="flex justify-between text-center">
                  <div>
                    <div className="text-2xl font-bold">{summary.pending}</div>
                    <div className="text-gray-600">Pending</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{summary.onHold}</div>
                    <div className="text-gray-600">On Hold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{summary.completed}</div>
                    <div className="text-gray-600">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Chatbot Widget */}
        {chatOpen && (
          <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-xl border z-50">
            <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
              <span>AI Helpdesk Chat</span>
              <button
                className="text-white font-bold"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded ${
                      msg.from === "user"
                        ? "bg-green-200 text-green-900"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="text-left">
                  <span className="inline-block px-3 py-2 rounded bg-gray-200 text-gray-800">
                    Typing...
                  </span>
                </div>
              )}
            </div>
            <form onSubmit={handleSend} className="flex gap-2 p-4 border-t">
              <input
                className="flex-1 border rounded px-3 py-2"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Send
              </button>
            </form>
          </div>
        )}
        {!chatOpen && (
          <button
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl z-50"
            onClick={() => setChatOpen(true)}
          >
            AI Helpdesk Chat
          </button>
        )}
      </main>
    </div>
  );
}