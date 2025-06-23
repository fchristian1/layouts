import React, { createContext, useContext } from "react";
export const HelpSystemContext = createContext();
export const HelpSystemProvider = HelpSystemContext.Provider;
export function useHelpSystemContext() {
  const ctx = useContext(HelpSystemContext);
  if (!ctx) throw new Error("HelpSystemContext not found!");
  return ctx;
}
