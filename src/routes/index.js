import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPages from "../features/post/PostDetailPages";
import NotFoundPage from "../pages/NotFoundPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import PostForm from "../features/post/PostForm";
import AuthRequire from "./AuthRequire";
import VerifyEmailPage from "../features/user/VerifyEmailPage";
import VerifyEmailTokenPage from "../features/user/VeryfyEmailTokenPage";

import PostChuPah from "../features/post/PostChuPah";
import PostPleiku from "../features/post/PostPleiku";
import PostChuSe from "../features/post/PostChuSe";
import PostDucCo from "../features/post/PostDucCo";
import PostIagrai from "../features/post/PostIagrai";
import ContactPage from "../pages/ContactPage";
import IntroducePage from "../pages/IntroducePage";
import UserChangePassword from "../features/user/UserChangePassword";
import BlogDetail from "../features/blog/BlogDetail";

function Router() {
  return (
    <Routes sx={{ m: 0, padding: 0 }}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/posts/:postId"
          element={
            <AuthRequire>
              <DetailPages />
            </AuthRequire>
          }
        />
        {/* <Route path="/users/:userId/posts" element={<FavoritePages />} /> */}
        <Route path="/blogs/:blogId" element={<BlogDetail />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chu-pah" element={<PostChuPah />} />
        <Route path="/pleiku" element={<PostPleiku />} />
        <Route path="/chu-se" element={<PostChuSe />} />
        <Route path="/duc-co" element={<PostDucCo />} />
        <Route path="/ia-grai" element={<PostIagrai />} />

        <Route
          path="/createPost"
          element={
            <AuthRequire>
              <PostForm />
            </AuthRequire>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route
          path="/changePassword"
          element={
            <AuthRequire>
              <UserChangePassword />
            </AuthRequire>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" component={<VerifyEmailPage />} />
        <Route path="/verify/:token" component={<VerifyEmailTokenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
