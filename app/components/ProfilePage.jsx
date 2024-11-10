import { useState, useEffect } from "react";
import EditProfileForm from "./EditProfileForm";
import { getUserProfile } from "@/lib/api";

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserProfile(userId);
      setUser(data);
    }
    fetchData();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      {editMode ? (
        <EditProfileForm user={user} onComplete={() => setEditMode(false)} />
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
