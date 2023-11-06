import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { NUMBER_BLOGS_OF_LIMIT } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  totalBlogs: 0,
  blogs: [],
  filteredBlogs: [],
  singleBlog: {},
};

const blogSlice = createSlice({
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
    deleteSingleBlogSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getFilteredBlogsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, filteredBlogs } = action.payload.data;
      state.totalBlogs = count;
      state.filteredBlogs = filteredBlogs;
    },
  },
});

export const {
  startLoading,
  hasError,
  getAllBlogsSuccess,
  getSingleBlogSuccess,
  deleteSingleBlogSuccess,
  getFilteredBlogsSuccess,
} = blogSlice.actions;

export const getAllBlogs = ({ page, limit = NUMBER_BLOGS_OF_LIMIT }) => async (
  dispatch
) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get(`/blogs?page=${page}&limit=${limit}`);
    dispatch(getAllBlogsSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error.message));
    toast.error(error.message);
  }
};

export const getSingleBlog = ({ blogId }) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get(`/blogs/${blogId}`);
    dispatch(getSingleBlogSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteSingleBlog = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await apiService.delete(`/blogs/${id}`);
    dispatch(deleteSingleBlogSuccess());
    toast.success("Deleted Blog successfully");
    dispatch(getAllBlogs());
  } catch (error) {
    dispatch(hasError(error.message));
    toast.error(error.message);
  }
};

export const getFilterBlogs = ({ page, limit = 10, type }) => async (
  dispatch
) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get(
      `/blogs/blog/${type}?page=${page}&limit=${limit}`
    );
    dispatch(getFilteredBlogsSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error.message));
    toast.error(error.message);
  }
};

export default blogSlice.reducer;
