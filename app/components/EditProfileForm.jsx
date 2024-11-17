import { useState } from "react";
import { updateUserProfile } from "@/lib/api";
import { useSession } from "next-auth/react";

export default function EditProfileForm({ user, onComplete, onError }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = session.user.provider;

    if(provider == 'google'){
      alert('Updates to Google account not allowed');
      return
    }
    try {
      const updatedUser = await updateUserProfile(user, formData);
      session.user.email = updatedUser.email
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

<form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 mt-8 space-y-6"
>
  {/* Name Input */}
  <div className="flex flex-col space-y-2">
    <label htmlFor="name" className="text-gray-700 font-medium">
      Name:
    </label>
    <input
      type="text"
      name="name"
      id="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your name"
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Email Input */}
  <div className="flex flex-col space-y-2">
    <label htmlFor="email" className="text-gray-700 font-medium">
      Email:
    </label>
    <input
      type="email"
      name="email"
      id="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
  >
    Save Changes
  </button>
</form>
  );
}
