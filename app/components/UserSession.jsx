"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "./ThemeProvider";

/**
 * Returns a welcome message to the user if they are authenticated.
 *
 * The message is rendered as an h1 element and includes the user's name.
 *
 * The text color of the welcome message is determined by the theme context.
 * When the theme is "dark", the text color is set to "text-gray-100".
 * When the theme is "light", the text color is set to "text-gray-900".
 * The user's name is always rendered with the color "#87e64b".
 *
 * If the user is not authenticated, the function returns null.
 */
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
