import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Assuming Sidebar is a separate component
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();
  const mainPadding = collapsed ? "pl-16" : "pl-64";
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
        <Outlet />
      </div>
    </div>
  );
}
