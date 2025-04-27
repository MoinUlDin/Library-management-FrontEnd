// src/components/MainContent.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BookServices from "../../services/BookServices";
import Toast from "../childrens/FloatingMessage";
import { Tooltip } from "@mui/material";

export default function BookRecordTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    BookServices.getAllBooks()
      .then((data) => setRows(data))
      .catch((err) => {
        console.error(err);
        setToastMessage("Failed to load books");
        setShowToast(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    setToastMessage(`Edit book #${id}`);
    setShowToast(true);
  };
  const handleDelete = (id) => {
    setToastMessage(`Delete book #${id}`);
    setShowToast(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "author", headerName: "Author", flex: 1, minWidth: 120 },
    { field: "isbn", headerName: "ISBN", width: 120 },
    { field: "publisher", headerName: "Publisher", flex: 1, minWidth: 120 },
    { field: "edition", headerName: "Edition", width: 100 },
    { field: "total_copies", headerName: "Total Copies", width: 120 },
    { field: "available_copies", headerName: "Available", width: 120 },
    { field: "rack_no", headerName: "Rack No.", width: 100 },
    { field: "shelf_location", headerName: "Shelf Loc.", width: 130 },
    {
      field: "date_of_entry",
      headerName: "Entry Date",
      width: 130,
      valueFormatter: ({ value }) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      filterable: false,
      disableExport: true,
      cellClassName: "sticky-actions",
      headerClassName: "sticky-actions",
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Tooltip title="Edit" placement="top">
            <FiEdit
              className="cursor-pointer"
              onClick={() => handleEdit(params.id)}
            />
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <FiTrash2
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(params.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="relative h-[600px] w-full">
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
      <div className="absolute inset-0 overflow-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          rowHeight={60}
          headerHeight={50}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          showToolbar
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: {
                fieldsToExport: columns
                  .filter((col) => col.field !== "actions")
                  .map((col) => col.field),
              },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F1857C",
              fontSize: "1rem",
              color: "#0d0f54",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0f0e0",
              whiteSpace: "normal",
              lineHeight: 1.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            /* New sticky-right rules */
            "& .sticky-actions": {
              position: "sticky",
              right: 0,
              backgroundColor: "#ffa300", // solid background to cover scrolled content
              zIndex: 1, // above other cells
            },
          }}
        />
      </div>
    </div>
  );
}
