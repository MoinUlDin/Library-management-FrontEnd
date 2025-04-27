import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import themeReducer from "../features/themeSlice";

// Combine all your reducers.
const appReducer = combineReducers({ authReducer, themeReducer });

// Create a root reducer that resets state on logout.
const rootReducer = (state, action) => {
  // Check if the logout action is dispatched.
  if (action.type === "auth/logout") {
    state = undefined; // This resets all state to initial values.
  }
  return appReducer(state, action);
};

// Configure the store using the root reducer.
export const store = configureStore({
  reducer: rootReducer,
});
