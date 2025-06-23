import HelpProvider from "./HelpSystem/HelpProvider";
import HelpPanel from "./HelpSystem/HelpPanel";
import HelpToggle from "./HelpSystem/HelpToggle";

export default function Layout({
  nav,
  aside,
  main,
  footer,
  helpContent,
  children,
}) {
  return (
    <HelpProvider helpContent={helpContent}>
      <div className="relative flex flex-col h-screen">
        <nav className="p-1 border-gray-300 border-b">{nav}</nav>
        <div className="flex flex-row flex-1 overflow-hidden">
          <aside className="px-1 py-2 border-e border-gray-300 w-20 overflow-auto">
            {aside}
          </aside>
          <main className="flex-1 p-2 overflow-auto">{main || children}</main>
        </div>
        <footer className="p-1 border-gray-300 border-t">{footer}</footer>
        <HelpPanel />
        <HelpToggle />
      </div>
    </HelpProvider>
  );
}
