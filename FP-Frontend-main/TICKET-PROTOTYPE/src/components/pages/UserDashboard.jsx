import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Bell, Plus, List } from "lucide-react";
import { getTickets } from "../../api";

export default function UserDashboard() {
  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Notification state
  const [notifs, setNotifs] = useState([
    { id: 1, text: "Your ticket #1 has a new reply.", read: false },
    { id: 2, text: "Your ticket #2 was marked as Pending.", read: false },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Search state for dashboard search bar
  const [searchQuery, setSearchQuery] = useState("");

  // Tickets state (fetched from backend)
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickets()
      .then(data => {
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          console.error("API did not return an array:", data);
          setTickets([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
        setLoading(false);
      });
  }, []);

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(ticket =>
    ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // Simulate AI reply
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "I'm just a demo bot. Please describe your issue!" }
      ]);
    }, 800);
  };

  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  // User data (replace with real data as needed)
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    role: "User",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff"
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-green-200 to-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg px-6 py-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-green-600 font-bold text-2xl">Tokopedia HelpDesk</span>
        </div>
        <nav className="flex flex-col gap-4">
          <Link to="/view-tickets" className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded transition">
            <List className="h-5 w-5" /> Requests
          </Link>
        </nav>
        <div className="mt-auto flex items-center gap-3 pt-10 border-t">
          <img src={user.avatar} alt="User" className="h-10 w-10 rounded-full" />
          <div>
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
          <div className="md:hidden flex items-center gap-2">
            <span className="text-green-600 font-bold text-xl">Tokopedia HelpDesk</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                className="relative focus:outline-none"
                onClick={() => setNotifOpen((open) => !open)}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">Notifications</span>
                    <button
                      className="text-xs text-green-600 hover:underline"
                      onClick={markAllRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifs.length === 0 && (
                      <div className="text-gray-400 text-sm">No notifications.</div>
                    )}
                    {notifs.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-3 py-2 rounded-md text-sm mb-1 ${
                          notif.read ? "bg-gray-50 text-gray-400" : "bg-green-50 text-gray-700"
                        }`}
                      >
                        {notif.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="focus:outline-none"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <img
                  src={user.avatar}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-green-400"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-green-100 z-50 p-6">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={user.avatar}
                      alt="User"
                      className="h-16 w-16 rounded-full mb-2"
                    />
                    <div className="text-lg font-bold text-green-700">{user.name}</div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                    <div className="text-xs text-gray-400 mt-1">{user.role}</div>
                  </div>
                  <Link to="/edit-details" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
                      Edit Details
                    </Button>
                  </Link>
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mt-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 pt-10 px-6 pb-8 max-w-3xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-green-700">Welcome to Tokopedia HelpDesk</h1>
            <p className="text-lg text-gray-600 mb-6">How can we help you?</p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search requests, templates, and tickets"
                className="w-full px-6 py-4 rounded-full text-gray-800 shadow border border-green-200"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Show filtered results */}
            {searchQuery && (
              <div className="mt-4 bg-white rounded shadow p-4 text-left">
                <h2 className="font-semibold mb-2 text-green-700">Search Results:</h2>
                {loading ? (
                  <div className="text-gray-500">Loading...</div>
                ) : filteredTickets.length === 0 ? (
                  <div className="text-gray-500">No matching tickets found.</div>
                ) : (
                  <ul>
                    {filteredTickets.map(ticket => (
                      <li key={ticket.id} className="mb-2">
                        <Link
                          to={`/ticket/${ticket.id}`}
                          className="font-medium hover:underline"
                        >
                          {ticket.subject}
                        </Link>
                        <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{ticket.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link to="/create-ticket">
              <Button className="bg-green-500 text-white hover:bg-green-600 shadow-lg flex items-center gap-2 px-6 py-3">
                <Plus className="h-5 w-5" /> Create an issue
              </Button>
            </Link>
          </div>

          {/* Summary Card */}
          <Card className="rounded-xl shadow-xl border border-green-200 max-w-md mx-auto">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-green-700">My Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-green-500">7</span>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-green-500">4</span>
                  <span className="text-sm text-gray-600">On Hold</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-green-500">15</span>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
        {/* AI Chatbot Floating Button and Window */}
        <div className="fixed bottom-6 right-6 z-50">
          {chatOpen ? (
            <div className="w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col">
              <div className="bg-green-500 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
                <span>AI Helpdesk Chat</span>
                <button onClick={() => setChatOpen(false)} className="text-white font-bold">×</button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm px-3 py-2 rounded-lg max-w-[80%] ${
                      msg.from === "user"
                        ? "bg-green-100 ml-auto text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="p-2 border-t flex gap-2">
                <input
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setChatOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl"
              aria-label="Open chat"
            >
              💬
            </button>
          )}
        </div>
      </div>
    </div>
  );
}