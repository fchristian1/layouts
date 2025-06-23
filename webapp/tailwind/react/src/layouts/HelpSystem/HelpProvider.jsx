import React from "react";
import { HelpSystemProvider } from "./HelpContext";
import useHelpSystem from "./useHelpSystem";

// Wrappender Provider, gibt Context an die Children weiter
export default function HelpProvider({ helpContent, children }) {
  const help = useHelpSystem({ helpContent });
  return <HelpSystemProvider value={help}>{children}</HelpSystemProvider>;
}
