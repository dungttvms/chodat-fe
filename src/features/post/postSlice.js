import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { NUMBER_POSTS_OF_LIMIT } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  filteredPosts: [],
  postsById: {},
  currentPagePosts: [],
  singlePost: "",
  favoritePosts: [],
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

    createNewPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    getAllPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload.data;
      state.totalPosts = count;
      state.posts = posts;
    },

    getSinglePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const singlePost = action.payload.data;
      state.singlePost = singlePost;
    },

    updateSinglePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const {
        _id,
        title,
        address,
        acreage,
        length,
        width,
        legal,
        type,
        direction,
        price,
        toilet,
        description,
        images,
        legal_images,
        province,
        googleMapLocation,
        videoFacebook,
        videoYoutube,
        videoTiktok,
        contact_name,
        contact_phoneNumber,
        isSoldOut,
      } = action.payload.data;
      state.postsById[_id].title = title;
      state.postsById[_id].address = address;
      state.postsById[_id].acreage = acreage;
      state.postsById[_id].length = length;
      state.postsById[_id].width = width;
      state.postsById[_id].legal = legal;
      state.postsById[_id].type = type;
      state.postsById[_id].direction = direction;
      state.postsById[_id].price = price;
      state.postsById[_id].toilet = toilet;
      state.postsById[_id].description = description;
      state.postsById[_id].images = images;
      state.postsById[_id].legal_images = legal_images;
      state.postsById[_id].province = province;
      state.postsById[_id].price = price;
      state.postsById[_id].googleMapLocation = googleMapLocation;
      state.postsById[_id].videoFacebook = videoFacebook;
      state.postsById[_id].videoYoutube = videoYoutube;
      state.postsById[_id].videoTiktok = videoTiktok;
      state.postsById[_id].contact_name = contact_name;
      state.postsById[_id].contact_phoneNumber = contact_phoneNumber;
      state.postsById[_id].isSoldOut = isSoldOut;
    },
    deleteSinglePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { _id } = action.payload.data;
      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== _id
      );
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.data
      );
      state.totalPosts -= 1;
    },
    getFilteredPostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, filteredPosts } = action.payload.data;
      state.totalPosts = count;
      state.filteredPosts = filteredPosts;
    },
    getFavoritePostsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const favoritePosts = action.payload.data;
      state.favoritePosts = favoritePosts;
    },
  },
});

//===============================================
export const createNewPost = ({
  title,
  address,
  acreage,
  length,
  width,
  legal,
  status,
  type,
  description,
  images,
  legal_images,
  province,
  direction,
  price,
  toilet,
  bedroom,
  videoYoutube,
  videoFacebook,
  videoTiktok,
  googleMapLocation,
  contact_name,
  contact_phoneNumber,
}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    //Upload images to Cloudinary
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageUrl = await cloudinaryUpload(images[i]);
      imageUrls.push(imageUrl);
    }

    // Upload legal images to the Cloudinary
    const legal_imageUrls = [];
    for (let j = 0; j < legal_images.length; j++) {
      const legal_imageUrl = await cloudinaryUpload(legal_images[j]);
      legal_imageUrls.push(legal_imageUrl);
    }

    //Process NumberOfPost

    const response = await apiService.post("/posts", {
      title,
      address,
      acreage,
      length,
      width,
      direction,
      legal,
      status,
      type,
      description,
      province,
      price,
      toilet,
      bedroom,
      videoYoutube,
      videoFacebook,
      videoTiktok,
      googleMapLocation,
      contact_name,
      contact_phoneNumber,

      images: imageUrls,
      legal_images: legal_imageUrls,
    });

    dispatch(slice.actions.createNewPostSuccess(response.data));

    toast.success("Create a new post success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getAllPosts = ({ page, limit = NUMBER_POSTS_OF_LIMIT }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await apiService.get(`/posts?${queryParams.toString()}`);
    dispatch(slice.actions.getAllPostsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getSinglePost = ({ postId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/posts/${postId}`);
    dispatch(slice.actions.getSinglePostSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSinglePost = ({ postId, data }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    const response = await apiService.put(`/posts/${postId}`, data);
    console.log(response);
    dispatch(slice.actions.updateSinglePostSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`posts/${id}`);
    dispatch(slice.actions.deleteSinglePostSuccess(response.data));
    toast.success("Deleted Post successfully");
    dispatch(getAllPosts());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getFilterPosts = ({ page, limit = 20, province }) => async (
  dispatch
) => {
  dispatch(slice.actions.startLoading());
  try {
    const queryParams = {
      page,
      limit,
    };
    const response = await apiService.get(
      `/posts/province/${province}?${queryParams.toString()}`
    );

    dispatch(slice.actions.getFilteredPostsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getFavoritePosts = ({ userId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/posts/${userId}/favoritePosts`);
    dispatch(slice.actions.getFavoritePostsSuccess(response.data));
    toast.success("Welcome your favorite posts list");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
