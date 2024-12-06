"use client";

import { SessionProvider } from "next-auth/react";

/**
 * The top-level component that wraps the entire app with the
 * `SessionProvider` context from `next-auth/react`. This component is
 * required for `next-auth` to work properly.
 *
 * A custom App component that wraps its children with a SessionProvider.
 * This ensures that session data is available to all components
 * within the application that use the session context.
 *
 * @function
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The children that will be wrapped by the `SessionProvider`.
 * @returns {React.ReactElement} The wrapped child components.
 */
export default function App({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
