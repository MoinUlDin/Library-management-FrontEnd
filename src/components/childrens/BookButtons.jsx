import React, { useState } from "react";
import { Button } from "@mui/material";
import { FiDatabase, FiFilePlus } from "react-icons/fi";
import AddEditBook from "../Forms/Book Management Forms/AddEditBookForm";
import Toast from "../childrens/FloatingMessage";

function BookButtons() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastmsg, setToastmsg] = useState("error");
  const onSubmit = async () => {};
  const onUpdate = async () => {};

  const onClose = () => setShowAddBook(false);
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => setShowAddBook(true)}
        variant="outlined"
        className="flex gap-2"
        sx={{}}
      >
        <FiFilePlus />
        <span>Add Book</span>
      </Button>
      <Button variant="outlined" className="flex gap-2">
        <FiDatabase />
        <span>Bulk Upload</span>
      </Button>

      {showAddBook && (
        <AddEditBook
          onClose={onClose}
          onSubmitCreate={onSubmit}
          onSubmitUpdate={onUpdate}
          setShowToast={setShowToast}
          setToastmsg={setToastmsg}
        />
      )}
      {showToast && (
        <Toast message={toastmsg} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default BookButtons;
