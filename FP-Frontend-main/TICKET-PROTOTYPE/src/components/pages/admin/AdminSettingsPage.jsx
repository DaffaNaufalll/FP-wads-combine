import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <Link to="/admin">
        <Button className="mb-4">&larr; Back to Dashboard</Button>
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Settings</h1>
      <div>Settings management coming soon...</div>
    </div>
  );
}