import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memberList: null,
  pendingApprovalsList: null,
  rejectedApprovalsList: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState: initialState,
  reducers: {
    setMemberList(state, action) {
      state.memberList = action.payload;
    },
    setPendingApprovals(state, action) {
      state.pendingApprovalsList = action.payload;
    },
    removeFromPendingApprovals(state, action) {
      const id = action.payload;
      state.pendingApprovalsList = state.pendingApprovalsList.filter(
        (item) => item.id != id
      );
    },
    setRejectedApprovals(state, action) {
      state.rejectedApprovalsList = action.payload;
    },
  },
});

export const {
  setMemberList,
  setPendingApprovals,
  setRejectedApprovals,
  removeFromPendingApprovals,
} = memberSlice.actions;
export default memberSlice.reducer;
