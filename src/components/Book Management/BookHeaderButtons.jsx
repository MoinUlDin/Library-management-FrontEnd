import React from "react";
import { FiBookOpen, FiGrid, FiList } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import { Tooltip, IconButton } from "@mui/material";

function BookHeaderButtons({
  viewMode,
  setViewMode,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="flex justify-between my-5 items-center px-8">
      {/* View Toggle */}
      <div className="flex items-center mb-2 gap-2">
        <Tooltip title="Table View">
          <IconButton
            color={viewMode === "table" ? "primary" : "default"}
            onClick={() => setViewMode("table")}
          >
            <FiList className="text-2xl" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Grid View">
          <IconButton
            size="small"
            color={viewMode === "grid" ? "primary" : "default"}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid className="text-2xl" />
          </IconButton>
        </Tooltip>
      </div>
      {/* Buttons */}
      <div className="flex gap-2 ">
        <button
          onClick={() => onStatusChange("write-off")}
          className={`bg-red-400  ${
            statusFilter === "write-off" ? "border-b-2" : ""
          } overflow-hidden px-3 relative border-blue-500 py-2 rounded ptr flex gap-2 items-center`}
        >
          <FiBookOpen />
          {/* <span className="absolute z-1 bg-accent rotate-45">active</span> */}
          Write Off Books
        </button>
        <button
          onClick={() => onStatusChange("lost")}
          className={`bg-yellow-500 ${
            statusFilter === "lost" ? "border-b-2" : ""
          } px-3 py-2 rounded ptr flex gap-2 items-center`}
        >
          <CiWarning />
          Lost Books
        </button>
        <button
          onClick={() => onStatusChange("all")}
          className={`bg-gray-400 px-3 py-2 rounded ptr flex gap-2 items-center`}
        >
          View All
        </button>
      </div>
    </div>
  );
}

export default BookHeaderButtons;
