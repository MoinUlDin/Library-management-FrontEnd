import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userData: null,
  userList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    login(state, action) {
      console.log("Login action payload:", action.payload);
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.userData = action.payload.role;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userData = null;
      state.userList = [];
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  login,
  setUserList,
  clearAuthData,
} = authSlice.actions;

export default authSlice.reducer;
