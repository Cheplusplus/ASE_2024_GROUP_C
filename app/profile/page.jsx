// "use client";
// import ProfilePage from "../components/ProfilePage";
// import { useSession } from "next-auth/react";

// export default function ProfilePageRoute() {
//   const { data: session, status } = useSession();

//   // Show a loading state while the session is being fetched
//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }
//   // Redirect to the login page if no session exists
//   if (!session) {
//     return <p className="text-center text-gray-600 text-lg mt-6 pt-16">
//     Please sign in to view your profile.
//   </p>;
//   }

//   const provider = session.user.provider;
//   let db = 'devdb';
//   if(provider == 'google'){
//      db= 'test'
//   }
//   // Use the email from the session as the user ID
//   const userId = session.user.email;

//   return <ProfilePage userId={userId} db={db}/>;
// }

"use client";
import ProfilePage from "../components/ProfilePage";
import { useSession } from "next-auth/react";
import Loading from "./loading";

export default function ProfilePageRoute() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading/>;
  }

  // Redirect to the login page if no session exists
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            Please sign in to view your profile.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="px-6 py-2 bg-[#26442a] text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  const provider = session.user.provider;
  let db = "devdb";
  if (provider == "google") {
    db = "test";
  }

  // Use the email from the session as the user ID
  const userId = session.user.email;

  return <ProfilePage userId={userId} db={db} />;
}
