import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  issuedList: null,
  returnedList: null,
  categories: null,
  departments: null,
  languages: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookList(state, action) {
      state.bookList = action.payload;
    },
    addBook(state, action) {
      state.list.push(action.payload); // simpler than spreading
    },
    deleteBook(state, action) {
      const idToDelete = action.payload;
      state.bookList = state.bookList.filter((book) => book.id !== idToDelete);
    },
    updateBook(state, action) {
      const updatedBook = action.payload;
      const index = state.bookList.findIndex(
        (book) => book.id === updatedBook.id
      );
      if (index !== -1) {
        state.bookList[index] = updatedBook;
      }
    },
    updateBookRelatedData(state, action) {
      const data = action.payload;
      state.categories = data.categories;
      state.departments = data.departments;
      state.languages = data.languages;
    },
    setIssuedList(state, action) {
      state.issuedList = action.payload;
    },
    addtoIssedlist(state, action) {
      state.issuedList.push(action.payload);
    },
    setReturnedlist(state, action) {
      state.returnedList = action.payload;
    },
  },
});

export const {
  setBookList,
  addBook,
  deleteBook,
  updateBook,
  updateBookRelatedData,
  setIssuedList,
  setReturnedlist,
  addtoIssedlist,
} = bookSlice.actions;

export default bookSlice.reducer;
