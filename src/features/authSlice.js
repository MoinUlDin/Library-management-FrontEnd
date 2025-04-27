import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userData: null,
  list: [],
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
    setList(state, action) {
      state.list = action.payload;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userData = null;
      state.list = [];
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  login,
  setList,
  clearAuthData,
} = authSlice.actions;

export default authSlice.reducer;
