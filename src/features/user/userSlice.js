import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  user: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changePasswordSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const changePassword =
  ({ oldPassword, newPassword }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/users/changePassword`, {
        oldPassword,
        newPassword,
      });
      dispatch(slice.actions.changePasswordSuccess(response.data));
      toast.success("Changed Password Success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
