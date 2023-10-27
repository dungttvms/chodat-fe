import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  user: [],
  updatedProfile: null,
  selectedUser: null,
  chatBot: null,
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
    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload.data;
    },
    updateCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload.data;
    },
    updateSingleUserByAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload.data;
    },
    getAllUsersByAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.data;
    },
    getSingleUserByAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload.data;
    },
    deleteSingleUserByAdminSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload.data;
    },
    getChatBotSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, chatBot } = action.payload.data;
      state.totalChatBot = count;
      state.chatBot = chatBot;
    },
    deleteChatBotSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.chatBot = action.payload.data;
    },
  },
});

export const changePassword = ({ oldPassword, newPassword }) => async (
  dispatch
) => {
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

export const getCurrentUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateCurrentUser = ({ name, phoneNumber, avatar }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const data = { name, phoneNumber };
    if (avatar instanceof File) {
      const imageUrl = await cloudinaryUpload(avatar);
      data.avatar = imageUrl;
    }
    const response = await apiService.put("/users/me", data);
    dispatch(slice.actions.updateCurrentUserSuccess(response.data));
    toast.success("Updated Profile Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getAllUsersByAdmin = ({
  filterName,
  page = 1,
  limit = 10,
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { page, limit };
    if (filterName) params.name = filterName;
    const response = await apiService.get("/users/admin", { params });
    dispatch(slice.actions.getAllUsersByAdminSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleUserByAdmin = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/admin/${id}`);
    dispatch(slice.actions.getSingleUserByAdminSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleUserByAdmin = ({
  id,
  name,
  phoneNumber,
  email,
  role,
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const data = { name, phoneNumber, email, role };
    const response = await apiService.put(`/users/admin/${id}`, data);
    dispatch(slice.actions.updateSingleUserByAdminSuccess(response.data));
    toast.success("Updated Profile Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const deleteSingleUserByAdmin = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/users/admin/${id}`);
    dispatch(slice.actions.deleteSingleUserByAdminSuccess(response.data));
    toast.success("Deleted User Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getChatBot = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/chatBots`);
    dispatch(slice.actions.getChatBotSuccess(response.data));
    console.log("Right Here:", response.data);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteChatBot = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/chatBots/${id}`);
    dispatch(slice.actions.deleteChatBotSuccess(response.data));
    dispatch(getChatBot());
    toast.success("Deleted User Success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
