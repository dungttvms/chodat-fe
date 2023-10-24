import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { NUMBER_BLOGS_OF_LIMIT } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  blogs: [],
  singleBlog: {},
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllBlogsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, blogs } = action.payload.data;
      state.totalBlogs = count;
      state.blogs = blogs;
    },
    getSingleBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleBlog = action.payload.data;
    },
    deleteSingleBlogSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getAllBlogs = ({ page, limit = NUMBER_BLOGS_OF_LIMIT }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/blogs?page=${page}&limit=${limit}`);

    dispatch(slice.actions.getAllBlogsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleBlog = ({ blogId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/blogs/${blogId}`);
    dispatch(slice.actions.getSingleBlogSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteSingleBlog = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`blogs/${id}`);
    dispatch(slice.actions.deleteSingleBlogSuccess(response.data));
    toast.success("Deleted Blog successfully");
    dispatch(getAllBlogs());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
