// src/components/BookFormModal.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { TextField, Autocomplete, Button, ListItem } from "@mui/material";
import { FiX } from "react-icons/fi";
import { truncateFileName, getDataforBook } from "../../../Constants/Helper";
import BookServices from "../../../services/BookServices";
import { useDispatch, useSelector } from "react-redux";

import { ImSpinner10, ImSpinner7 } from "react-icons/im";

export default function BookFormModal({
  onClose,
  existingBook = null,
  setShowToast = null,
  setToastmsg = null,
}) {
  const isEdit = Boolean(existingBook);
  const buttontxt = isEdit ? "Update" : "Submit";
  const buttontxtSubmitting = isEdit ? "Updating" : "Submitting";
  const [coverFileNames, setCoverFileNames] = useState([]);
  const [ebookFileName, setEbookFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const statuses = ["ACTIVE", "WRITE_OFF", "LOST"];
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.book.departments);
  const languages = useSelector((state) => state.book.languages);
  const categories = useSelector((state) => state.book.categories);

  useEffect(() => {
    console.log("not fetching", departments, languages, categories);
    if (!departments || !languages || !categories) {
      setLoading(true);
      console.log("Fetching book related data", departments, languages);
      BookServices.GetBookRelatedData(dispatch)
        .then((res) => {
          console.log("response", res);
        })
        .catch((errors) => {
          console.log(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      department: null,
      publisher: "",
      total_copies: "",
      category: null,
      rack_no: "",
      language: null,
      status: "",
      detailed_description: "",
      cover_photos: [],
      ebook_file: null,
    },
  });

  // Prefill when existingBook arrives
  useEffect(() => {
    if (existingBook) {
      reset({
        title: existingBook.title || "",
        author: existingBook.author || "",
        isbn: existingBook.isbn || "",
        department:
          departments?.find((d) => d.id === existingBook.department?.id) ||
          null,
        publisher: existingBook.publisher || "",
        total_copies: existingBook.total_copies || "",
        category:
          categories?.find((c) => c.id === existingBook.category?.id) || null,
        rack_no: existingBook.rack_no || "",
        language:
          languages?.find((l) => l.id === existingBook.language?.id) || null,
        detailed_description: existingBook.detailed_description || "",
        cover_photos: [],
        ebook_file: null,
        status: existingBook.status,
      });
    }
  }, [existingBook, reset, departments, languages, categories, loading]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("isbn", data.isbn);
    formData.append("department", data.department.id);
    formData.append("publisher", data.publisher);
    formData.append("total_copies", data.total_copies);
    formData.append("category", data.category.id);
    formData.append("rack_no", data.rack_no);
    formData.append("language", data.language.id);
    formData.append("detailed_description", data.detailed_description);
    if (isEdit) formData.append("status", data.status);
    if (data.cover_photos.length > 0) {
      Array.from(data.cover_photos).forEach((file) =>
        formData.append("cover_photos", file)
      );
    }

    if (data.ebook_file) {
      formData.append("ebook_file", data.ebook_file);
    }

    if (isEdit) {
      await handleUpdate(existingBook.id, formData);
    } else {
      await handleSubmitNew(formData);
    }
  };

  const coverPhotos = watch("cover_photos");
  const ebookFile = watch("ebook_file");
  // Handlers
  useEffect(() => {
    if (coverPhotos && coverPhotos.length) {
      // FileList → array → names
      const arr = Array.from(coverPhotos).map((f) => f.name);
      setCoverFileNames(arr);
    } else {
      setCoverFileNames([]);
    }
  }, [coverPhotos]);
  useEffect(() => {
    if (ebookFile) {
      // if register() gives you a FileList:
      const file = ebookFile[0] ?? ebookFile;
      setEbookFileName(file.name);
    } else {
      setEbookFileName("");
    }
  }, [ebookFile]);

  const handleSubmitNew = async (formData) => {
    setSubmitting(true);
    BookServices.addBook(formData, dispatch)
      .then((res) => {
        setToastmsg("Book Added Successfully");
        setShowToast(true);
        onClose();
      })
      .catch((error) => {
        console.log("we have Error", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const handleUpdate = async (id, formData) => {
    setSubmitting(true);
    BookServices.UpdateBook(id, formData, dispatch)
      .then((res) => {
        setToastmsg("Book Updated Successfully");
        setShowToast(true);
        onClose();
      })
      .catch((error) => {
        console.log("we have Error", error);
        // setToastmsg(error);
        setShowToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="bg-white mt-5 h-svh rounded shadow-lg w-full max-w-2xl p-6 z-10 overflow-auto">
        <div className="flex justify-between ">
          <h2 className="text-xl font-semibold mb-4 select-none">
            {isEdit ? "Update Book" : "Add New Book"}
          </h2>
          <FiX onClick={() => onClose()} className="text-2xl ptr" />
        </div>

        {loading && (
          <div className="flex gap-4 items-center mt-10 justify-center text-5xl ">
            <ImSpinner10 className="animate-spin" />
            <span>Loading...</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 ${loading ? "hidden" : ""}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title *"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                  size="small"
                />
              )}
            />

            {/* Author */}
            <Controller
              name="author"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Author *"
                  error={!!errors.author}
                  helperText={errors.author?.message}
                  fullWidth
                  size="small"
                />
              )}
            />

            {/* ISBN */}
            <Controller
              name="isbn"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ISBN *"
                  error={!!errors.isbn}
                  helperText={errors.isbn?.message}
                  fullWidth
                  size="small"
                />
              )}
            />

            {/* Department */}
            <Controller
              name="department"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={departments}
                  getOptionLabel={(opt) => opt.name}
                  onChange={(_, v) => field.onChange(v)}
                  isOptionEqualToValue={(opt, value) => opt.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department *"
                      error={!!errors.department}
                      helperText={errors.department && "Required"}
                      fullWidth
                      size="small"
                    />
                  )}
                />
              )}
            />

            {/* Publisher */}
            <Controller
              name="publisher"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Publisher"
                  fullWidth
                  size="small"
                  error={!!errors.publisher}
                  helperText={errors.publisher && "Required"}
                />
              )}
            />

            {/* Total copies */}
            <Controller
              name="total_copies"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total Copies *"
                  type="number"
                  error={!!errors.total_copies}
                  helperText={errors.total_copies?.message}
                  fullWidth
                  size="small"
                />
              )}
            />

            {/* Category */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={categories}
                  getOptionLabel={(opt) => opt.name}
                  onChange={(_, v) => field.onChange(v)}
                  isOptionEqualToValue={(opt, value) => opt.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category *"
                      error={!!errors.category}
                      helperText={errors.category && "Required"}
                      fullWidth
                      size="small"
                    />
                  )}
                />
              )}
            />

            {/* Rack No */}
            <Controller
              name="rack_no"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rack No."
                  error={!!errors.rack_no}
                  helperText={errors.rack_no && "Required"}
                  fullWidth
                  size="small"
                />
              )}
            />

            {/* Language */}
            <Controller
              name="language"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={languages}
                  getOptionLabel={(opt) => opt.name}
                  onChange={(_, v) => field.onChange(v)}
                  isOptionEqualToValue={(opt, value) => opt.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Language *"
                      error={!!errors.language}
                      helperText={errors.language && "Required"}
                      fullWidth
                      size="small"
                    />
                  )}
                />
              )}
            />
            {isEdit && (
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={statuses}
                    getOptionLabel={(opt) => opt} // since these are plain strings
                    onChange={(_, v) => field.onChange(v)}
                    isOptionEqualToValue={(opt, value) => opt === value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status *"
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                )}
              />
            )}
          </div>

          {/* Detailed Description */}
          <Controller
            name="detailed_description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Detailed Description"
                multiline
                rows={3}
                fullWidth
                size="small"
              />
            )}
          />

          {/* File uploads */}
          {/* File uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            {/* Cover Photos */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Cover Photos (multiple)
              </label>
              <div className="relative">
                <input
                  {...register("cover_photos")}
                  type="file"
                  multiple
                  accept="image/*"
                  id="cover_photos"
                  className="hidden"
                />
                <label
                  htmlFor="cover_photos"
                  className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Choose Cover Photos
                </label>
              </div>
              {coverPhotos && coverPhotos.length > 0 && (
                <p className="mt-2 text-gray-600 text-sm">
                  Files:{" "}
                  {coverFileNames.map((n) => truncateFileName(n)).join(", ")}
                </p>
              )}
            </div>

            {/* eBook File */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                eBook File
              </label>
              <div className="relative">
                <input
                  {...register("ebook_file")}
                  type="file"
                  accept=".pdf"
                  id="ebook_file"
                  className="hidden"
                />
                <label
                  htmlFor="ebook_file"
                  className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Upload PDF
                </label>
              </div>
              {ebookFile && ebookFile.length > 0 && (
                <p className="mt-2 text-gray-600 text-sm">
                  Selected: {truncateFileName(ebookFileName)}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              <div className="flex gap-3 justify-center items-center">
                {submitting && <ImSpinner7 className="animate-spin text-xl" />}
                {submitting ? buttontxtSubmitting : buttontxt}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

BookFormModal.propTypes = {
  onSubmitCreate: PropTypes.func.isRequired,
  onSubmitUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  existingBook: PropTypes.object,
};
