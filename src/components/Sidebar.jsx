import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MENU from "../Constants/SidebarMenu";
import { FiMenu } from "react-icons/fi";
import Logo from "../components/childrens/Logo";

const Sidebar = ({ collapsed, onToggle }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  // Handle clicks outside to close floating submenu when collapsed
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        collapsed &&
        openMenu &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapsed, openMenu]);

  // Auto-expand the active parent menu on route change when expanded
  useEffect(() => {
    if (!collapsed) {
      const activeParent = MENU.find(
        (item) =>
          item.children &&
          item.children.some((child) => child.path === location.pathname)
      );
      if (activeParent) {
        setOpenMenu(activeParent.title);
      } else {
        setOpenMenu(null);
      }
    }
  }, [location.pathname, collapsed]);

  const handleParentClick = (item) => {
    setOpenMenu((prev) => (prev === item.title ? null : item.title));
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-sidebarPadding ${
        isMobile
          ? collapsed
            ? "w-sidebarCollapsed"
            : "w-3/4"
          : collapsed
          ? "w-sidebarCollapsed"
          : "w-sidebar"
      } overflow-auto z-50`}
    >
      {/* LOGO + HAMBURGER */}
      <div
        className={`flex items-center p-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && <Logo css="size-8" padding="p-2" />}
        <button
          onClick={() => onToggle()}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <FiMenu size={20} />
        </button>
      </div>
      <div className="">
        <ul className="h-full flex flex-col">
          {MENU.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            if (!hasChildren) {
              // Render single-level item
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </NavLink>
                </li>
              );
            }
            // Parent with children
            const isActiveParent = item.children.some(
              (child) => child.path === location.pathname
            );
            return (
              <li key={item.title} className="relative">
                <div
                  className={`flex items-center cursor-pointer px-4 py-3 hover:bg-gray-700 ${
                    isActiveParent ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleParentClick(item)}
                >
                  <item.icon className="size-5" />
                  {!collapsed && (
                    <span className="ml-3 flex-1">{item.title}</span>
                  )}
                  {!collapsed && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openMenu === item.title ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
                {openMenu === item.title && collapsed && (
                  <ul className="absolute left-[calc(100%_+_var(--spacing-sidebarPadding)_+_1px)] top-0 w-64 bg-gray-800 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-700 ${
                              isActive ? "bg-gray-700" : ""
                            }`
                          }
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                {openMenu === item.title && !collapsed && (
                  <ul className="flex flex-col pl-6">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 hover:bg-gray-700 ${
                              isActive ? "bg-gray-700" : ""
                            }`
                          }
                        >
                          {child.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
