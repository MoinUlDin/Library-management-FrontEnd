import apiClient from "./apiClient"; // set up with Axios
import { parseError } from "../Constants/Helper";
import {
  addBook,
  updateBook,
  setBookList,
  setIssuedList,
  setReturnedlist,
  addtoIssedlist,
  updateBookRelatedData,
} from "../features/bookSlice";

class BookServices {
  // Login Method
  static async getAllBooks(dispatch) {
    try {
      const response = await apiClient.get("books/books/");
      const data = response.data;
      dispatch(setBookList(data));
      return data;
    } catch (error) {
      console.log(error);
      const errorMessage = parseError(error);
      throw new Error(errorMessage);
    }
  }

  static async addBook(formData, dispatch) {
    try {
      console.log("calling Api Using apiClient");
      const response = await apiClient.post("books/books/", formData);
      const data = response.data;
      dispatch(addBook(data));
      console.log("data", data);
      return data;
    } catch (error) {
      print(error);
      const message = parseError(error);
      throw new Error(message);
    }
  }
  static async UpdateBook(id, formData, dispatch) {
    try {
      console.log("calling Api Using apiClient formData: ", formData);

      const response = await apiClient.patch(`books/books/${id}/`, formData);
      const data = response.data;
      dispatch(updateBook(data));
      console.log("data", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async IssueBook(formData, dispatch) {
    try {
      const response = await apiClient.post("books/issued-books/", formData);
      dispatch(addtoIssedlist(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async GetBookRelatedData(dispatch) {
    try {
      // kick off all three requests at once
      const [catRes, langRes, depRes] = await Promise.all([
        apiClient.get("categories/"),
        apiClient.get("language/"),
        apiClient.get("admin-departments/"),
      ]);

      const payload = {
        categories: catRes.data,
        languages: langRes.data,
        departments: depRes.data,
      };
      dispatch(updateBookRelatedData(payload));
      return payload;
    } catch (error) {
      throw error;
    }
  }
  static async GetIssuedBookData(dispatch) {
    try {
      const response = await apiClient.get("/books/issued-books/");
      dispatch(setIssuedList(response.data));
      console.log("data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async GetReturnedBookData(dispatch) {
    try {
      // Endpoint Not found
      // const response = await apiClient.get("/?");
      // dispatch(setReturnedlist(response.data));
    } catch (error) {
      throw error;
    }
  }
}

export default BookServices;
