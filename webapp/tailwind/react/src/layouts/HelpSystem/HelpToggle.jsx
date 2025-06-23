import React from "react";
import { useHelpSystemContext } from "./HelpContext";

export default function HelpToggle() {
  const { isOpen, onToggle, toggleRef, getBottomY } = useHelpSystemContext();

  return (
    <div
      ref={toggleRef}
      className={
        "right-0 z-50 fixed content-center bg-gray-200 hover:bg-amber-300 shadow-lg border border-gray-300 rounded-full w-10 aspect-square text-xl text-center transition-colors duration-200 ease-in-out cursor-pointer select-none"
      }
      style={{ top: getBottomY() }}
      onClick={onToggle}
      tabIndex={0}
      role="button"
      aria-label={isOpen ? "Hilfe schließen" : "Hilfe öffnen"}
    >
      {isOpen ? "✕" : "?"}
    </div>
  );
}
