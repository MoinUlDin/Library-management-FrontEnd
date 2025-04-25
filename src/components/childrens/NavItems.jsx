import { Link, useLocation } from "react-router-dom";

export default function NavItem({ icon, label, to, collapsed }) {
  const { pathname } = useLocation();
  const active = pathname.endsWith(to);
  const base = `
    flex items-center gap-3 p-2 my-1 rounded
    ${active ? "bg-blue-100 text-blue-600" : "text-gray-200 hover:bg-gray-700"}
  `;

  return (
    <Link to={to} className={base}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
