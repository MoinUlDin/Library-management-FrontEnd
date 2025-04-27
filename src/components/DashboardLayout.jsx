import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Assuming Sidebar is a separate component
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./childrens/DashboardHeader"; // Assuming DashboardHeader is a separate component

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();
  const mainPadding = collapsed
    ? "pl-[calc(var(--spacing-sidebarPadding)+var(--spacing-sidebarCollapsed))]"
    : "pl-[calc(var(--spacing-sidebarPadding)+var(--spacing-sidebar))]";
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      {/* main Content Area */}
      <div className={`${mainPadding} flex-1 flex flex-col overflow-auto`}>
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}
