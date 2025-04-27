import apiClient from "./apiClient"; // set up with Axios

class BookServices {
  // Login Method
  static async getAllBooks(formData) {
    try {
      const response = await apiClient.get("books/");
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.non_field_errors ||
        error.response?.data?.detail ||
        "Unkown error occurred";
      throw new Error(errorMessage);
    }
  }
}

export default BookServices;
