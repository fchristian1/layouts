import React from "react";
import { useHelpSystemContext } from "./HelpContext";

export default function HelpPanel() {
  const { isOpen, isAnimated, helpContent, handleToggleOption, panelRef } =
    useHelpSystemContext();

  return (
    <aside
      ref={panelRef}
      className={
        "bg-gray-100 shadow-inner overflow-hidden fixed right-0 top-0 h-full z-40 transition-all duration-500 ease-in-out " +
        (isOpen
          ? "max-w-md opacity-100 translate-x-0"
          : "max-w-0 opacity-0 translate-x-full")
      }
      style={{ width: isOpen ? 360 : 0 }}
    >
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-2 hover:bg-gray-200 mb-2 px-2 py-1 border hover:border-gray-300 border-transparent rounded cursor-pointer select-none">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={isAnimated}
            onChange={handleToggleOption}
          />
          <label className="cursor-pointer" onClick={handleToggleOption}>
            Hilfesymbol Animation
          </label>
        </div>
        <div>{helpContent}</div>
      </div>
    </aside>
  );
}
