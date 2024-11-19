"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "./ThemeProvider";
import { useVoiceAssistant } from "./SessionProvider"; // Import the new context

const UserSession = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { isPaused } = useVoiceAssistant(); // Access pause state

  if (session) {
    return (
      <div>
        <h1
          className={`text-2xl font-bold sm:text-2xl ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Welcome, <span className="text-[#87e64b]">{session.user.name}</span>
        </h1>
        {/* Display pause state */}
        <p className={`mt-2 ${isPaused ? "text-red-500" : "text-green-500"}`}>
          {isPaused ? "Voice Assistant Paused" : "Voice Assistant Active"}
        </p>
      </div>
    );
  }
};

export default UserSession;
