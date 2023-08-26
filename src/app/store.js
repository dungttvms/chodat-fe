import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import blogReducer from "../features/blog/blogSlice";

const rootReducer = {
  post: postReducer,
  user: userReducer,
  blog: blogReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
