import React, { useEffect, useState } from "react";
import IssueBookForm from "../../components/Forms/Book Management Forms/IssueBookForm";
import { Tooltip } from "@mui/material";
import { FiBookOpen, FiEdit, FiTrash } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import BookServices from "../../services/BookServices";
import Toast from "../../components/childrens/FloatingMessage";

function IssueBook() {
  const [showIssueBook, setShowIssueBook] = useState(false);
  const issuedBookList = useSelector((state) => state.book.issuedList || null);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(issuedBookList);
    if (!issuedBookList) {
      setLoading(true);
      BookServices.GetIssuedBookData(dispatch)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  const columns = [
    { field: "member", headerName: "Member", width: 140 },
    { field: "book", headerName: "Book", width: 140 },
    { field: "issue_date", headerName: "Issue Date", width: 150 },
    { field: "due_date", headerName: "Due Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "returned_at", headerName: "Return Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      filterable: false,
      disableExport: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 w-ful h-full items-center">
            <Tooltip title="Edit" placement="top">
              <FiEdit
                className="cursor-pointer"
                onClick={() => handleShowForm("edit", params.id)}
              />
            </Tooltip>
            <Tooltip title="Write Off" placement="top">
              <FiBookOpen className="cursor-pointer" onClick={() => {}} />
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <FiTrash
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(params.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleShowForm = (mode, id) => {
    if (mode === "new") {
      setExisting(null);
      setShowIssueBook(true);
    } else {
      const existing = issuedBookList.find((item) => item.id === id);
      // console.log("book", issuedBookList);
      setExisting(existing);
      setShowIssueBook(true);
    }
  };
  return (
    <div className="mt-8">
      {/* Header Buttons */}
      <div className="flex items-center justify-end px-8">
        <button
          onClick={() => handleShowForm("new")}
          className="px-3 py-2 ptr bg-amber-500 rounded hover:bg-amber-700 "
        >
          Issue Book
        </button>
      </div>
      {/* table Content */}
      <div className="px-1 my-6 overflow-x-auto">
        <DataGrid
          rows={issuedBookList}
          columns={columns}
          // loading={loading}
          rowHeight={60}
          headerHeight={50}
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
          }}
        />
      </div>

      {showIssueBook && (
        <IssueBookForm
          onClose={() => setShowIssueBook(false)}
          existing={existing}
          setToastmsg={setToastMessage}
          setShowToast={setShowToast}
        />
      )}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default IssueBook;
