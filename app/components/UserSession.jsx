"use client";
import { useSession } from "next-auth/react";

const UserSession = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
          Welcome, <span className="text-[#87e64b]">{session.user.name}</span>
        </h1>
      </div>
    );
  }
};

export default UserSession;
