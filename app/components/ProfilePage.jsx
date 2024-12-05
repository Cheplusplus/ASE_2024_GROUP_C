"use client";
import { useState, useEffect } from "react";
import EditProfileForm from "./EditProfileForm";
import { getUserProfile } from "@/lib/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import loading from "../profile/loading";

/**
 * ProfilePage is a Next.js component that displays the user's profile and allows them to edit it.
 * It fetches the user's profile from the database and displays it in a profile card.
 * When the user clicks the "Edit Profile" button, it sets editMode to true and displays the EditProfileForm component.
 * If the user updates their profile successfully, it sets editMode to false and displays a success message.
 * If there is an error, it displays an error message.
 * @param {object} props - Component props
 * @param {string} props.userId - User ID to fetch profile for
 * @param {string} props.db - Database to fetch profile from (either 'test' or 'devdb')
 * @returns A React component that displays the user's profile and allows them to edit it
 */
export default function ProfilePage({ userId, db }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const { data: session } = useSession();

  useEffect(() => {
 /**
 * Asynchronously fetches the user's profile data from the specified database and sets it to the state variable "user".
 * If successful, updates the user state with the fetched data.
 * If an error occurs during fetching, sets an error message.
 * @function
 * @async
 * @throws {Error} If the request fails
 *
 * @returns {Promise<void>} A promise that resolves when the profile data is fetched and state is updated.
 */
    async function fetchData() {
      try {
        const data = await getUserProfile(userId, db);
        console.log(data.email, "123");
        setUser(data);
      } catch (error) {
        setMessage({ type: "error", content: "Failed to load profile." });
      }
    }
    fetchData();
  }, [userId]);


/**
 * Handles a successful profile update.
 * Updates the user state with the updated user data,
 * sets editMode to false, and displays a success message.
 * Resets the message after 3 seconds.
 * @param {Object} updatedUser - The updated user data
 * @function
 * @private
 */
  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
    setMessage({ type: "success", content: "Profile updated successfully!" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 2000); // Reset message after 3 seconds
  };

  const handleUpdateError = () => {
    setMessage({ type: "error", content: "Failed to update profile." });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 2000); // Reset message after 3 seconds
  };

  if (!user) return <loading />;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6  bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-2xl font-bold  text-gray-800">Account & Profile</h1>

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
          <>
            <div className=" min-h-screen p-3 ">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full w-4xl px-2 mt-12 ">
                <div className="relative">
                  <Image
                    className="w-full rounded-lg h-36 object-cover"
                    src="/wallpaper2.jpg"
                    alt="Background"
                    layout="responsive"
                    width={1920} // Adjust to the actual dimensions of the wallpaper
                    height={144} // Adjust to the desired aspect ratio of the image
                    priority // Optional: Use this if the background image is important for the first render
                  />
                  <div className="absolute top-24 left-4">
                    {session.user.image ? (
                      <Image
                        className="rounded-full w-32 h-32 border-4 border-white object-cover"
                        src={session.user.image}
                        alt="Profile"
                        width={128} // Set the width of the profile image
                        height={128} // Set the height of the profile image
                        objectFit="cover" // Ensures the image covers the container without distortion
                      />
                    ) : (
                      <div className="rounded-full w-32 h-32 text-[6rem] border-4 border-white object-cover hover:bg-slate-100 flex text-center items-center justify-center bg-slate-200 object-center">
                        {session.user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-20 px-4 pb-20">
                  <h1 className="text-l font-bold">{user.name}</h1>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
