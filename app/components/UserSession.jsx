"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "./ThemeProvider";

const UserSession = () => {
  const { data: session } = useSession();
  const {theme} = useTheme();
  
  if (session) {
    return (
      <div>
        <h1 className={`text-2xl font-bold sm:text-2xl ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
          Welcome, <span className="text-[#87e64b]">{session.user.name}</span>
        </h1>
      </div>
    );
  }
};

export default UserSession;
