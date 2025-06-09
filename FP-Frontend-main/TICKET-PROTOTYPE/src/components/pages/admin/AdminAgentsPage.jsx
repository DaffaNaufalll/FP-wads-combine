import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminAgentsPage() {
  // You can fetch and display agent stats here
  return (
    <div className="p-8">
      <Link to="/admin">
        <Button className="mb-4">&larr; Back to Dashboard</Button>
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Agents</h1>
      <div>Agent stats and management coming soon...</div>
    </div>
  );
}