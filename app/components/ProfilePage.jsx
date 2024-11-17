'use client'
import { useState, useEffect } from "react";
import EditProfileForm from "./EditProfileForm";
import { getUserProfile } from "@/lib/api";

export default function ProfilePage({ userId,db }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserProfile(userId,db);
        console.log(data)
        setUser(data);
      } catch (error) {
        setMessage({ type: "error", content: "Failed to load profile." });
      }
    }
    fetchData();
  }, [userId]);

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
    setMessage({ type: "success", content: "Profile updated successfully!" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000); // Reset message after 3 seconds
  };

  const handleUpdateError = () => {
    setMessage({ type: "error", content: "Failed to update profile." });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000); // Reset message after 3 seconds
  };

  if (!user) return <p>Loading...</p>;

  return (
<div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">Profile</h1>

  {/* Success/Error Message */}
  {message.content && (
    <p
      className={`text-sm mb-4 ${
        message.type === "error" ? "text-red-500" : "text-green-500"
      }`}
    >
      {message.content}
    </p>
  )}

  {/* Edit Mode or Profile Details */}
  {editMode ? (
    <EditProfileForm
      user={user}
      onComplete={handleUpdateSuccess}
      onError={handleUpdateError}
    />
  ) : (
    <div className="space-y-4">
      <p>
        <strong className="text-gray-700">Name:</strong> {user.name}
      </p>
      <p>
        <strong className="text-gray-700">Email:</strong> {user.email}
      </p>
      <button
        onClick={() => setEditMode(true)}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Edit Profile
      </button>
    </div>
  )}
</div>

  );
}
