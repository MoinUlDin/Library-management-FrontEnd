// src/Constants/SidebarMenu.js
import {
  FiHome,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const MENU = [
  {
    title: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    title: "book",
    icon: FiBookOpen,
    path: "/dashboard/books",
    children: [
      {
        title: "Book Record",
        path: "/dashboard/books/record",
      },
      {
        title: "Issue Book",
        path: "/dashboard/books/issue",
      },
      {
        title: "Return Book",
        path: "/dashboard/books/return",
      },
      {
        title: "Online Catalogue",
        path: "/dashboard/books/catalogue",
      },
    ],
  },
  {
    title: "member",
    icon: FiUsers,
    path: "/dashboard/members",
    children: [
      {
        title: "Add Member",
        path: "/dashboard/members/add",
      },
      {
        title: "Pending Approvals",
        path: "/dashboard/members/pending",
      },
      {
        title: "Rejected Approvals",
        path: "/dashboard/members/rejected",
      },
      {
        title: "Disable Member",
        path: "/dashboard/members/disable",
      },
      {
        title: "Membership",
        path: "/dashboard/members/plan",
      },
    ],
  },
  {
    title: "reservations",
    icon: FiCalendar,
    path: "/dashboard/reservations",
    children: [
      {
        title: "Book Reservation List",
        path: "/dashboard/reservations/list",
      },
      {
        title: "Reserved Book Queue",
        path: "/dashboard/reservations/queue",
      },
    ],
  },
  {
    title: "reports",
    icon: FiBarChart2,
    path: "/dashboard/reports",
    children: [
      {
        title: "Book Report",
        path: "/dashboard/reports/books",
      },
      {
        title: "Member Report",
        path: "/dashboard/reports/members",
      },
      {
        title: "Library Management Report",
        path: "/dashboard/reports/library",
      },
      {
        title: "Notification History Panel",
        path: "/dashboard/reports/notifications",
      },
      {
        title: "Audit Trail",
        path: "/dashboard/reports/audit",
      },
    ],
  },
  {
    title: "settings",
    icon: FiSettings,
    path: "/dashboard/settings",
    children: [
      {
        title: "General Settings",
        path: "/dashboard/settings/general",
      },
      {
        title: "Book Settings",
        path: "/dashboard/settings/books",
      },
      {
        title: "Member Settings",
        path: "/dashboard/settings/members",
      },
      {
        title: "User Management",
        path: "/dashboard/settings/users",
      },
      {
        title: "Notification Settings",
        path: "/dashboard/settings/notifications",
      },
      {
        title: "Catalogue Settings",
        path: "/dashboard/settings/catalogue",
      },
      {
        title: "Security Settings",
        path: "/dashboard/settings/security",
      },
    ],
  },
];

export default MENU;
