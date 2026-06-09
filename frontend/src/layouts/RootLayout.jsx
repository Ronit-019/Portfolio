import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import BottomNav from "../components/layout/BottomNav";
import CommandPalette from "../components/layout/CommandPalette";

export default function RootLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-primary">
      {/* Global Shell Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navigation / Breadcrumbs */}
        <TopBar />

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav />
      </div>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />
    </div>
  );
}
