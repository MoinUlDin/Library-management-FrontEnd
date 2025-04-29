import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import themeReducer from "../features/themeSlice";
import bookReducer from "../features/bookSlice";
import memberSlice from "../features/memberSlice";
// Combine all your reducers.
const appReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  book: bookReducer,
  member: memberSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
