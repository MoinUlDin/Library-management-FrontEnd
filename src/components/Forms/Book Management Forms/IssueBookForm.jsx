// src/components/Forms/BookManagement/IssueBookForm.jsx
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField, Button } from "@mui/material";
import { FiX } from "react-icons/fi";
import Logo from "../../childrens/Logo";
import BookServices from "../../../services/BookServices";
import MemberServices from "../../../services/MemberServices";
import { ImSpinner10 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

export default function IssueBookForm({
  onClose,
  existing,
  setShowToast = null,
  setToastmsg = null,
}) {
  const [SubmittingData, setSubmitingData] = useState(false);
  const buttonText = existing ? "Update" : "Submit";
  const [loading, setLoading] = useState(false);
  const buttonTextSubmitting = existing ? "Updating" : "Submiting";
  const bookList = useSelector((state) => state.book.list);
  const memberList = useSelector((state) => state.member.list);
  const dispatch = useDispatch();

  const statusOptions = ["ISSUED"];

  useEffect(() => {
    if (!bookList || !memberList) {
      setLoading(true);
    }
    console.log("Member", memberList);
    console.log("Book", bookList);
    BookServices.getAllBooks(dispatch).catch((error) => {
      console.log(error);
    });
    MemberServices.getMemberList(dispatch)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    control,
    register,
    handleSubmit, // <— pull handleSubmit
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      issue_date: "",
      due_date: "",
      status: "ISSUED",
      book: null,
      member: null,
    },
  });

  // If editing, prefill
  useEffect(() => {
    if (existing) {
      reset({
        issue_date: existing.issue_date,
        due_date: existing.due_date,
        status: existing.status,
        book: bookList.find((b) => b.id === existing.book.id) || null,
        member: memberList.find((m) => m.id === existing.member.id) || null,
      });
    }
  }, [existing, bookList, memberList, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      book: data.book.id,
      member: data.member.id,
    };
    console.log("Submitting payload:", payload);

    setSubmitingData(true);
    BookServices.IssueBook(payload, dispatch)
      .then((res) => {
        setToastmsg("Book Issued Successfully");
        setShowToast(true);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setToastmsg("An Error Occurs");
        setShowToast(true);
      })
      .finally(() => {
        setSubmitingData(false);
      });
  };

  // Helper for date inputs to show native picker on click
  const dateInputProps = {
    InputLabelProps: { shrink: true },
    InputProps: {
      inputProps: {
        style: { cursor: "pointer" },
        onClick: (e) => {
          const input = e.target;
          if (typeof input.showPicker === "function") {
            input.showPicker();
          }
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-60" onClick={onClose} />
      <div className="bg-white z-10 rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        {/* Header Icon + Text + X */}
        <div className="bg-blue-800 text-white flex items-center justify-between px-6 py-4">
          <div className="flex gap-3 items-center">
            <Logo css="size-8" />
            <span className="text-2xl text-amber-100 font-bold">
              Book Issue Form
            </span>
          </div>

          <FiX onClick={onClose} className="ptr text-2xl hover:text-red-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4 p-6">
            {/* Issue Date */}
            <Controller
              name="issue_date"
              control={control}
              rules={{ required: "Issue date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Issue Date *"
                  size="small"
                  fullWidth
                  error={!!errors.issue_date}
                  helperText={errors.issue_date?.message}
                  {...dateInputProps}
                />
              )}
            />

            {/* Due Date */}
            <Controller
              name="due_date"
              control={control}
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Due Date *"
                  size="small"
                  fullWidth
                  error={!!errors.due_date}
                  helperText={errors.due_date?.message}
                  {...dateInputProps}
                />
              )}
            />

            {/* Status */}
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={statusOptions}
                  getOptionLabel={(opt) => opt}
                  onChange={(_, v) => field.onChange(v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status *"
                      size="small"
                      fullWidth
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    />
                  )}
                />
              )}
            />

            {/* Book */}
            <Controller
              name="book"
              control={control}
              rules={{ required: "Book is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={bookList}
                  getOptionLabel={(opt) => opt.title}
                  isOptionEqualToValue={(opt, value) => opt.id === value.id}
                  onChange={(_, v) => field.onChange(v)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.title}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Book *"
                      size="small"
                      fullWidth
                      error={!!errors.book}
                      helperText={errors.book?.message}
                    />
                  )}
                />
              )}
            />

            {/* Member */}
            <Controller
              name="member"
              control={control}
              rules={{ required: "Member is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={memberList}
                  getOptionLabel={(opt) => opt.username}
                  isOptionEqualToValue={(opt, value) => opt.id === value.id}
                  onChange={(_, v) => field.onChange(v)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.username}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Member *"
                      size="small"
                      fullWidth
                      error={!!errors.member}
                      helperText={errors.member?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6 p-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              <div className="flex gap-3 items-center">
                {SubmittingData && <ImSpinner10 className="animate-spin" />}
                <span>
                  {SubmittingData ? buttonTextSubmitting : buttonText}
                </span>
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
