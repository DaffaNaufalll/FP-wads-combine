import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminReportsPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://fp-backends-production.up.railway.app/api/reports/admin/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        setSummary(null);
      }
      setLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-8">
      <Link to="/admin">
        <Button className="mb-4">&larr; Back to Dashboard</Button>
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Reports & Analytics</h1>
      {loading ? (
        <div>Loading...</div>
      ) : !summary ? (
        <div>Could not load report data.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-700">{summary.total}</div>
            <div className="text-gray-600 mt-2">Total Tickets</div>
          </div>
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">{summary.pending}</div>
            <div className="text-gray-600 mt-2">Pending (Open)</div>
          </div>
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{summary.onHold}</div>
            <div className="text-gray-600 mt-2">On Hold</div>
          </div>
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-gray-800">{summary.completed}</div>
            <div className="text-gray-600 mt-2">Completed (Closed)</div>
          </div>
        </div>
      )}
    </div>
  );
}