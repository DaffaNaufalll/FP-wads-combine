import React, { useState } from "react";
import { Button } from "../ui/button";

export default function MyDetailsPage() {
  // Replace with real user data and update logic as needed
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff");

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here (API call)
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-white flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl border p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">My Profile</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-2">
            <img src={avatar} alt="Avatar" className="h-20 w-20 rounded-full border mb-2" />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div>
            <label className="block mb-1 text-green-700 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-green-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}