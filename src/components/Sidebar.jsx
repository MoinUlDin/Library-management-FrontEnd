import {
  FiMenu,
  FiHome,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import NavItem from "./childrens/NavItems";

export default function Sidebar({ collapsed, onToggle }) {
  const baseClasses = `
    bg-gray-800 text-gray-200 border-r border-gray-200 flex flex-col
    transition-width duration-300
    ${collapsed ? "w-16" : "w-64"}
    ${
      collapsed && window.innerWidth < 768
        ? "absolute z-20 h-full"
        : "fixed inset-y-0 left-0"
    }
  `;

  return (
    <aside className={baseClasses}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <span className="text-xl font-bold">MyLogo</span>}
        <button onClick={onToggle} className="p-2 rounded hover:bg-gray-100">
          <FiMenu size={20} />
        </button>
      </div>
      <nav className="flex-1 px-2">
        <div className="mt-4">
          {!collapsed && (
            <span className="text-xs uppercase text-gray-500">Main</span>
          )}
          <NavItem
            icon={<FiHome />}
            label="Dashboard"
            to="/dashboard"
            collapsed={collapsed}
          />
        </div>
        <div className="mt-6">
          {!collapsed && (
            <span className="text-xs uppercase text-gray-500">Components</span>
          )}
          <NavItem
            icon={<FiBookOpen />}
            label="Book Management"
            to="/dashboard/books"
            collapsed={collapsed}
          />
          <NavItem
            icon={<FiUsers />}
            label="Member Management"
            to="/dashboard/members"
            collapsed={collapsed}
          />
          <NavItem
            icon={<FiCalendar />}
            label="Online Reservations"
            to="/dashboard/reservations"
            collapsed={collapsed}
          />
          <NavItem
            icon={<FiBarChart2 />}
            label="Reports"
            to="/dashboard/reports"
            collapsed={collapsed}
          />
          <NavItem
            icon={<FiSettings />}
            label="Settings"
            to="/dashboard/settings"
            collapsed={collapsed}
          />
        </div>
      </nav>
    </aside>
  );
}
