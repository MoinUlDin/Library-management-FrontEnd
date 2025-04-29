import apiClient from "./apiClient"; // set up with Axios
import { parseError } from "../Constants/Helper";
import {
  setMemberList,
  setPendingApprovals,
  setRejectedApprovals,
  removeFromPendingApprovals,
} from "../features/memberSlice";
import { set } from "react-hook-form";

class MemberServices {
  static async getMemberList(dispatch) {
    try {
      const response = await apiClient.get("users/all-members/");
      dispatch(setMemberList(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async getPendingApprovalsList(dispatch) {
    try {
      const response = await apiClient.get("users/pending-users/");
      dispatch(setPendingApprovals(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async setMemberApproved(id, dispatch) {
    try {
      const response = await apiClient.post(`auth/approve-user/${id}/`);
      dispatch(removeFromPendingApprovals(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async setMemberRejected(id, dispatch) {
    try {
      const response = await apiClient.post(`/auth/decline/${id}/`);
      dispatch(removeFromPendingApprovals(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async ToggleMemberDisabled(id, dispatch) {
    try {
      const response = await apiClient.post(
        `/users/member/${id}/disable_enable/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MemberServices;
