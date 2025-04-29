import React, { useState, useEffect, useRef, Children } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MENU from "../Constants/SidebarMenu";
import { FiChevronDown, FiChevronUp, FiMenu } from "react-icons/fi";
import Logo from "../components/childrens/Logo";
import { createPortal } from "react-dom";

import {
  FiHome,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { Menu } from "@mui/material";

const Sidebar = ({ collapsed, onToggle }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLinkKey, setActiveLinkKey] = useState(null);
  const [submenuCoords, setSubmenuCoords] = useState({ left: 0, top: 0 });
  const sidebarRef = useRef(null);
  const location = useLocation();
  const iconSize = "size-5";
  const textSize = "text-sm";
  const activeLink = "bg-gray-600 text-blue-300";
  const activeParent = "bg-gay-700 text-blue-300";
  const childTextColor = "text-gray-400";

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
    if (collapsed && openMenu) {
      setOpenMenu(null);
    }
  }, [location.pathname, collapsed]);

  const toggleMenu = (e, menuKey) => {
    e.preventDefault();
    // If sidebar is collapsed, calculate where to place the floating submenu
    if (collapsed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setSubmenuCoords({ left: rect.right + 9, top: rect.top });
    }
    // Toggle the submenu open/closed
    setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
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
          className="p-2 ptr hover:bg-gray-700 rounded"
        >
          <FiMenu size={20} />
        </button>
      </div>

      <div className="uppercase text-gray-500 mb-3 mt-1">
        {collapsed ? "" : "Main"}
      </div>
      <NavLink
        to="/dashboard"
        className={(isActive) =>
          `flex items-center p-2 px-2 ${
            collapsed ? "justify-center" : ""
          } gap-3 ${
            location.pathname.endsWith("dashboard") ? activeLink : ""
          }  `
        }
      >
        <FiHome className={`${iconSize}`} />
        {!collapsed && <span className="ml-3">Dashboard</span>}
      </NavLink>

      {/*Spacer */}
      <div className="uppercase text-gray-500 mb-3 mt-1">
        {collapsed ? "" : "Components"}
      </div>

      {/* Book Management Section */}
      <div>
        {/* Parent */}
        <button
          onClick={(e) => toggleMenu(e, "book")}
          className={`flex ptr items-center ${
            location.pathname.includes("book") && activeParent
          } ${
            collapsed ? "justify-center" : "justify-between"
          } py-3 px-2 w-full `}
        >
          <div className="flex gap-5">
            <FiBookOpen className={`${iconSize}`} />
            {!collapsed && (
              <span className={`${textSize}`}>Book Management</span>
            )}
          </div>
          {!collapsed && (
            <FiChevronDown
              className={`ml-3 transition-transform ${
                openMenu === "book" ? "transform rotate-180" : ""
              }`}
            />
          )}
        </button>
        {/* Children */}
        {openMenu === "book" && collapsed
          ? createPortal(
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-800 z-10 text-white"
                style={{
                  position: "fixed",
                  left: submenuCoords.left,
                  top: submenuCoords.top,
                }}
              >
                <ul className="text-gray-300 ptr">
                  {MENU.map((item) => {
                    if (item.title === "book") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className=" px-2 pr-12 hover:bg-gray-600 py-3">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>,
              document.body
            )
          : openMenu === "book" && (
              <div className={`ptr`}>
                <ul className={`${childTextColor} ptr`}>
                  {MENU.map((item) => {
                    if (item.title === "book") {
                      return item.children.map((child) => (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          end
                          className={({ isActive }) =>
                            `${isActive ? activeLink : ""}   hover:bg-gray-600`
                          }
                        >
                          <li className={`ml-2 pl-11 hover:bg-gray-600 py-2`}>
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>
            )}
      </div>

      {/* Member Management Section */}
      <div className="mt-1">
        {/* Parent */}
        <button
          onClick={(e) => toggleMenu(e, "member")}
          className={`flex ptr items-center ${
            location.pathname.includes("members") && activeParent
          }  ${
            collapsed ? "justify-center" : "justify-between"
          } py-3 px-2 w-full `}
        >
          <div className="flex gap-5">
            <FiUsers className={`${iconSize}`} />
            {!collapsed && (
              <span className={`${textSize}`}>Member Management</span>
            )}
          </div>

          {!collapsed && (
            <FiChevronDown
              className={`transition-transform ${
                openMenu === "member" ? "transform rotate-180" : ""
              }`}
            />
          )}
        </button>
        {/* Childrens */}
        {openMenu === "member" && collapsed
          ? createPortal(
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-800 z-10 text-white"
                style={{
                  position: "fixed",
                  left: submenuCoords.left,
                  top: submenuCoords.top,
                }}
              >
                <ul className="text-gray-300 ptr">
                  {MENU.map((item) => {
                    if (item.title === "member") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className=" px-2 pr-12 hover:bg-gray-600 py-3">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>,
              document.body
            )
          : openMenu === "member" && (
              <div className={`mt-1 ptr`}>
                <ul className={`${childTextColor} ptr`}>
                  {MENU.map((item) => {
                    if (item.title === "member") {
                      return item.children.map((child) => (
                        <NavLink
                          className={({ isActive }) =>
                            `${isActive ? activeLink : ""}   hover:bg-gray-600`
                          }
                          key={child.title}
                          to={child.path}
                        >
                          <li className="ml-2 pl-11 hover:bg-gray-600 py-2">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>
            )}
      </div>

      {/* Online Reservations Section */}
      <div className="mt-1">
        {/* Parent */}
        <button
          onClick={(e) => toggleMenu(e, "reservations")}
          className={`flex ptr items-center ${
            location.pathname.includes("reservations") && activeParent
          } ${
            collapsed ? "justify-center" : "justify-between"
          } py-3 px-2 w-full `}
        >
          <div className="flex gap-5">
            <FiCalendar className={`${iconSize}`} />
            {!collapsed && (
              <span className={`${textSize}`}>Online Reservations</span>
            )}
          </div>

          {!collapsed && (
            <FiChevronDown
              className={`transition-transform ${
                openMenu === "reservations" ? "transform rotate-180" : ""
              }`}
            />
          )}
        </button>
        {/* Childrens */}
        {openMenu === "reservations" && collapsed
          ? createPortal(
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-800 z-10 text-white"
                style={{
                  position: "fixed",
                  left: submenuCoords.left,
                  top: submenuCoords.top,
                }}
              >
                <ul className="text-gray-300 ptr">
                  {MENU.map((item) => {
                    if (item.title === "reservations") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className=" px-2 pr-12 hover:bg-gray-600 py-3">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>,
              document.body
            )
          : openMenu === "reservations" && (
              <div className={`mt-1 ptr`}>
                <ul className={`${childTextColor} ptr`}>
                  {MENU.map((item) => {
                    if (item.title === "reservations") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className="ml-2 pl-11 hover:bg-gray-600 py-2">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>
            )}
      </div>

      {/* Reports Section */}
      <div className="mt-1">
        {/* Parent */}
        <button
          onClick={(e) => toggleMenu(e, "reports")}
          className={`flex ptr items-center ${
            location.pathname.includes("reports") && activeParent
          } ${
            collapsed ? "justify-center" : "justify-between"
          } py-3 px-2 w-full `}
        >
          <div className="flex gap-5">
            <FiBarChart2 className={`${iconSize}`} />
            {!collapsed && <span className={`${textSize}`}>Reports</span>}
          </div>

          {!collapsed && (
            <FiChevronDown
              className={`transition-transform ${
                openMenu === "reports" ? "transform rotate-180" : ""
              }`}
            />
          )}
        </button>
        {/* Childrens */}
        {openMenu === "reports" && collapsed
          ? createPortal(
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-800 z-10 text-white"
                style={{
                  position: "fixed",
                  left: submenuCoords.left,
                  top: submenuCoords.top,
                }}
              >
                <ul className="text-gray-300 ptr">
                  {MENU.map((item) => {
                    if (item.title === "reports") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className=" px-2 pr-12 hover:bg-gray-600 py-3">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>,
              document.body
            )
          : openMenu === "reports" && (
              <div className={`mt-1 ptr`}>
                <ul className={`${childTextColor} ptr`}>
                  {MENU.map((item) => {
                    if (item.title === "reports") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className="ml-2 pl-11 hover:bg-gray-600 py-2">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>
            )}
      </div>

      {/* settings Section */}
      <div className="mt-1">
        {/* Parent */}
        <button
          onClick={(e) => toggleMenu(e, "settings")}
          className={`flex ptr items-center ${
            location.pathname.includes("settings") && activeParent
          } ${
            collapsed ? "justify-center" : "justify-between"
          } py-3 px-2 w-full `}
        >
          <div className="flex gap-5">
            <FiSettings className={`${iconSize}`} />
            {!collapsed && <span className={`${textSize}`}>Settings</span>}
          </div>

          {!collapsed && (
            <FiChevronDown
              className={`transition-transform ${
                openMenu === "settings" ? "transform rotate-180" : ""
              }`}
            />
          )}
        </button>
        {/* Childrens */}
        {openMenu === "settings" && collapsed
          ? createPortal(
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="bg-gray-800 z-10 h-84 text-white overflow-auto"
                style={{
                  position: "fixed",
                  left: submenuCoords.left,
                  top: submenuCoords.top - 55,
                }}
              >
                <ul className="text-gray-300 ptr">
                  {MENU.map((item) => {
                    if (item.title === "settings") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className=" px-2 pr-12 hover:bg-gray-600 py-3">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>,
              document.body
            )
          : openMenu === "settings" && (
              <div className={`mt-1 ptr`}>
                <ul className={`${childTextColor} ptr`}>
                  {MENU.map((item) => {
                    if (item.title === "settings") {
                      return item.children.map((child) => (
                        <NavLink key={child.title} to={child.path}>
                          <li className="ml-2 pl-11 hover:bg-gray-600 py-2">
                            {child.title}
                          </li>
                        </NavLink>
                      ));
                    }
                  })}
                </ul>
              </div>
            )}
      </div>
      {/* bottom spacer */}
      <div className="mt-10 block"></div>
    </div>
  );
};

export default Sidebar;
