'use client'
import { useState, useEffect } from "react";
import EditProfileForm from "./EditProfileForm";
import { getUserProfile } from "@/lib/api";

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserProfile(userId);
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
  };

  const handleUpdateError = () => {
    setMessage({ type: "error", content: "Failed to update profile." });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      {message.content && (
        <p className={message.type === "error" ? "text-red-500" : "text-green-500"}>
          {message.content}
        </p>
      )}
      {editMode ? (
        <EditProfileForm
          user={user}
          onComplete={handleUpdateSuccess}
          onError={handleUpdateError}
        />
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}
