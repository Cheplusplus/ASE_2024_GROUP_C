import { useState } from "react";
import { updateUserProfile } from "@/lib/api";
import { useSession } from "next-auth/react";

/**
 * EditProfileForm component allows users to edit their profile information,
 * specifically their name and email. It handles form submission and user input changes.
 * If the user is authenticated via Google, updates are not allowed.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - Object containing user details
 * @param {function} props.onComplete - Callback function invoked after a successful profile update
 * @param {function} props.onError - Callback function invoked when there is an error updating the profile
 */
export default function EditProfileForm({ user, onComplete, onError }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const { data: session, status } = useSession();

  /**
   * Handles form submission. Prevents default form submission, determines the
   * authentication provider for the user, and prevents updates to Google
   * accounts. If the user is authenticated via a different provider, updates
   * the user's profile information and triggers the onComplete callback if
   * successful. If there is an error, it triggers the onError callback.
   * @param {Event} e - Form submission event
   */
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

/**
 * Handles changes to the input fields in the form.
 * Updates the formData state with the new value for the
 * corresponding input field.
 * 
 * @param {Event} e - The change event triggered by the form input.
 */
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
