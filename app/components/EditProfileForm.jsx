import { useState } from "react";
import { updateUserProfile } from "@/lib/api";

export default function EditProfileForm({ user, onComplete, onError }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(user._id, formData);
      onComplete(updatedUser); // Trigger success message and close form
    } catch (error) {
      onError(); // Trigger error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
