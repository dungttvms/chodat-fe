import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { NUMBER_POSTS_OF_LIMIT } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  // favoritePosts: [],
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload.data;
      state.totalPosts = count;
      state.posts = posts;
    },
    // addPostToFavoriteListSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const favoritePosts = action.payload.data;
    //   state.favoritePosts = favoritePosts;
    // },
    // removePostFromFavoriteListSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   // const { _id } = action.payload.data;
    //   // state.favoritePosts = state.favoritePosts.filter(
    //   //   (postId) => postId !== _id
    //   // );
    // },
  },
});

export const createPost =
  ({
    type,
    district,
    address,
    title,
    description,
    acreage,
    direction,
    price,
    wish,
    images,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //Upload image to Cloudinary
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await cloudinaryUpload(images[i]);
        imageUrls.push(imageUrl);
      }
      const response = await apiService.post("/posts", {
        type,
        district,
        address,
        title,
        description,
        acreage,
        direction,
        price,
        wish,
        image: imageUrls,
      });

      dispatch(slice.actions.createPostSuccess(response.data));

      toast.success("Create a new post success");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPosts =
  ({ page, limit = NUMBER_POSTS_OF_LIMIT }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/posts?page=${page}&limit=${limit}`
      );
      dispatch(slice.actions.getPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

// export const addPostToFavoriteList =
//   ({ postId }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await apiService.post(`/users/me/${postId}`);
//       console.log("response: ", response);
//       dispatch(slice.actions.addPostToFavoriteListSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

// export const removePostFromFavoriteList =
//   ({ postId }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await apiService.delete(`/users/me/${postId}`);
//       dispatch(slice.actions.removePostFromFavoriteListSuccess(response.data));
//       console.log(response.data);
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };

export default slice.reducer;
