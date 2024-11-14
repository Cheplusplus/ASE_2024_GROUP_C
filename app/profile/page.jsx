"use client";
import ProfilePage from "../components/ProfilePage";
import { useSession } from "next-auth/react";

export default function ProfilePageRoute() {
  const { data: session, status } = useSession();

  // Show a loading state while the session is being fetched
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  // Redirect to the login page if no session exists
  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  const provider = session.user.provider;
  let db = 'devdb';
  if(provider == 'google'){
     db= 'test'
  }
  // Use the email from the session as the user ID
  const userId = session.user.email;
 


  return <ProfilePage userId={userId} db={db}/>;
}
