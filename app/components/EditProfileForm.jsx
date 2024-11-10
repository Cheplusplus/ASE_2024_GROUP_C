import { useState } from "react";
import { updateUserProfile } from "@/lib/api";

export default function EditProfileForm({ user, onComplete }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updateUserProfile(user._id, { name, email, username });
    setLoading(false);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
      <button type="button" onClick={onComplete}>
        Cancel
      </button>
    </form>
  );
}
