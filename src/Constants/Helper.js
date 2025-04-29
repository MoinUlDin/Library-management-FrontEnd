//Constants/Helper.js
import { data } from "react-router-dom";
import apiClient from "../services/apiClient";

// helper.js// helper.js

export function parseError(err) {
  let data = err?.response?.data;

  // 1) No payload? fallback to err.message
  if (data == null) {
    return err.message || "An unknown error occurred";
  }

  // 2) If it’s a string, try JSON.parse; if that fails, just return the raw string
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return data;
    }
  }

  // 3) Now data is (hopefully) an object. Grab the first value:
  const firstVal = Object.values(data)[0];

  // 4a) If it’s an array of strings, join them
  if (Array.isArray(firstVal)) {
    return firstVal.join(" ");
  }

  // 4b) If it’s a string, return it
  if (typeof firstVal === "string") {
    return firstVal;
  }

  // 5) Otherwise, stringify whatever it is
  try {
    return JSON.stringify(firstVal);
  } catch {
    return "An unexpected error occurred";
  }
}

export function truncateFileName(name, maxLen = 8) {
  const dot = name.lastIndexOf(".");
  const base = dot > -1 ? name.slice(0, dot) : name;
  const ext = dot > -1 ? name.slice(dot) : "";
  const short = base.length > maxLen ? base.slice(0, maxLen) + ".." : base;
  return `(${short}${ext})`;
}

export async function getDataforBook(
  dispatch,
  setLoading = null,
  setDep,
  setCat,
  setLang
) {
  try {
    if (setLoading) setLoading(true);
    const categories = await apiClient.get("categories/");
    const languages = await apiClient.get("language/");
    const departments = await apiClient.get("admin-departments/");

    setDep(departments.data);
    setCat(categories.data);
    setLang(languages.data);

    setLoading(false);
  } catch (error) {
    const msg = parseError(error);
    setLoading && setLoading(false);
  }
}
