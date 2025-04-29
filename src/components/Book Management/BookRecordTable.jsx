// src/components/BookRecordTable.jsx
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FiBookOpen, FiEdit, FiTrash2 } from "react-icons/fi";
import BookServices from "../../services/BookServices";
import Toast from "../childrens/FloatingMessage";
import { Tooltip, IconButton } from "@mui/material";
import BookHeaderButtons from "./BookHeaderButtons";
import AddEditBook from "../Forms/Book Management Forms/AddEditBookForm";
import { CiWarning } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

export default function BookRecordTable() {
  const bookList = useSelector((state) => state.book.bookList);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [existingBook, setExistingBook] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "write-off" | "lost"

  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    BookServices.getAllBooks(dispatch)
      .catch((err) => {
        console.error(err);
        setToastMessage("Failed to load books");
        setShowToast(true);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleEdit = (id) => {
    bookList &&
      bookList.map((item) => {
        if (item.id == id) {
          setExistingBook(item);
          setShowEditForm(true);
        }
      });
  };
  const handleDelete = (id) => {
    setToastMessage(`Delete book #${id}`);
    setShowToast(true);
  };

  // === Restore your columns definition ===
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
      field: "language",
      headerName: "Language",
      width: 100,
      renderCell: (params) => {
        const lang = params.row.language?.name || "-";
        return <span>{lang}</span>;
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 100,
      renderCell: (params) => {
        const depart = params.row.department?.name || "-";
        return <p>{depart}</p>;
      },
    },
    {
      field: "categories",
      headerName: "Category",
      width: 100,
      renderCell: (params) => {
        const cat = params.row.category?.name || "-";
        return <p>{cat}</p>;
      },
    },
    {
      field: "date_of_entry",
      headerName: "Entry Date",
      width: 130,
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
        <div className="flex gap-2 text-gray-100">
          <Tooltip title="Edit" placement="top">
            <FiEdit
              className="cursor-pointer"
              onClick={() => handleEdit(params.id)}
            />
          </Tooltip>
          <Tooltip title="Write Off" placement="top">
            <FiBookOpen
              className="cursor-pointer"
              onClick={() => handleEdit(params.id)}
            />
          </Tooltip>
          <Tooltip title="Lost Book" placement="top">
            <CiWarning
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

  // Filtering Logic
  const filteredRows = bookList.filter((b) => {
    if (statusFilter === "all") return true;
    return b.status?.toLowerCase() === statusFilter;
  });

  return (
    <div className="relative w-full">
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
      <BookHeaderButtons
        onStatusChange={setStatusFilter}
        statusFilter={statusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "table" ? (
        <div className="h-[600px]">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            rowHeight={60}
            headerHeight={50}
            pageSize={10}
            disableSelectionOnClick
            showToolbar
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                csvOptions: {
                  fieldsToExport: columns
                    .filter((c) => c.field !== "actions")
                    .map((c) => c.field),
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
              "& .sticky-actions": {
                position: "sticky",
                right: 0,
                color: "#e3e3e3",
                backgroundColor: "#333333",
                zIndex: 1,
              },
            }}
          />
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
          {filteredRows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{row.title}</h3>
                <div className="flex gap-2">
                  <Tooltip title="Edit">
                    <FiEdit
                      className="cursor-pointer"
                      onClick={() => handleEdit(row.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <FiTrash2
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(row.id)}
                    />
                  </Tooltip>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Author:</span> {row.author}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">ISBN:</span> {row.isbn}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Publisher:</span> {row.publisher}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Copies:</span>{" "}
                {row.available_copies}/{row.total_copies}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Entered:</span>{" "}
                {row.date_of_entry
                  ? new Date(row.date_of_entry).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}

      {showEditForm && (
        <AddEditBook
          onClose={() => setShowEditForm(false)}
          setShowToast={setShowToast}
          setToastmsg={setToastMessage}
          existingBook={existingBook}
        />
      )}
    </div>
  );
}
