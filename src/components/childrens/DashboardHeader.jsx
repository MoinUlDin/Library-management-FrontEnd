import { Tooltip } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { FiSettings, FiShare, FiUser } from "react-icons/fi";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserService from "../../services/userServices";
import { clearAuthData } from "../../features/authSlice";
import BookButtons from "./BookButtons";
import MemberButtons from "./MemberButtons";

function DashboardHeader() {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setExpanded(false);
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  const handleLogout = () => {
    console.log("Logout clicked");
    UserService.logout(dispatch)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };

  return (
    <div className="flex w-full h-16 justify-between items-center p-8 bg-white shadow-md">
      {location.pathname.includes("book") && <BookButtons />}
      {location.pathname.endsWith("dashboard") && <div></div>}
      {location.pathname.includes("member") && <MemberButtons />}
      <div className="flex items-center text-lg gap-6">
        <WidgetsIcon className="text-amber-700 ptr" />
        <div
          ref={menuRef}
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full relative bg-gray-600 text-white ptr"
        >
          <FiUser />
          {expanded && (
            <div className="absolute overflow-hidden flex justify-start flex-col gap-2 text-white bg-gray-600 rounded-lg z-1000 top-10 -left-10">
              <span className="hover:bg-amber-700 p-3 px-10 ">Profile</span>
              <span
                onClick={handleLogout}
                className="hover:bg-amber-700 p-3 px-8 "
              >
                Logout
              </span>
            </div>
          )}
        </div>

        <Tooltip title="settings" placement="bottom" arrow="true">
          <FiSettings className="ptr" />
        </Tooltip>
      </div>
    </div>
  );
}

export default DashboardHeader;
