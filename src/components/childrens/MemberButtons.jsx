import React, { useState } from "react";
import { Button } from "@mui/material";
import { FiDatabase, FiFilePlus } from "react-icons/fi";
import AddEditBook from "../Forms/Book Management Forms/AddEditBookForm";
import Toast from "./FloatingMessage";

function MemberButtons() {
  const [showToast, setShowToast] = useState(false);
  const [toastmsg, setToastmsg] = useState("error");
  const onSubmit = async () => {};
  const onUpdate = async () => {};

  // const onClose = () => setShowAddBook(false);
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => {}}
        variant="outlined"
        className="flex gap-2"
        sx={{}}
      >
        <FiFilePlus />
        <span>Add Member</span>
      </Button>
      <Button variant="outlined" className="flex gap-2">
        <FiDatabase />
        <span>Bulk Upload</span>
      </Button>

      {showToast && (
        <Toast message={toastmsg} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default MemberButtons;
