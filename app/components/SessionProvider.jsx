'use client'

import { createContext, useContext, useState } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

const VoiceAssistantContext = createContext();

export const useVoiceAssistant = () => {
  return useContext(VoiceAssistantContext);
};

export default function SessionProvider({ children }) {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <NextAuthSessionProvider>
      <VoiceAssistantContext.Provider value={{ isPaused, togglePause }}>
        {children}
      </VoiceAssistantContext.Provider>
    </NextAuthSessionProvider>
  );
}
