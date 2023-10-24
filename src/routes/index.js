import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import PostDetail from "../features/post/PostDetail";
import NotFoundPage from "../pages/NotFoundPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import AccountPage from "../pages/AccountPage";

import AuthRequire from "./AuthRequire";
// import VerifyEmailPage from "../features/user/VerifyEmailPage";
// import VerifyEmailTokenPage from "../features/user/VeryfyEmailTokenPage";

import ContactPage from "../pages/ContactPage";
import IntroducePage from "../pages/IntroducePage";
import UserChangePassword from "../features/user/UserChangePassword";
import UserProfile from "../features/user/UserProfile";
import PostCreate from "../features/post/PostCreate";
import BlogDetail from "../features/blog/BlogDetail";
import AdminControlPanel from "../features/user/AdminControlPanel";
import Regulations from "../pages/Regulations";

function Router() {
  return (
    <Routes sx={{ m: 0, padding: 0 }}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route
          path="/posts/:postId"
          element={
            <AuthRequire>
              <PostDetail />
            </AuthRequire>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <AuthRequire>
              <BlogDetail />
            </AuthRequire>
          }
        />
        <Route
          path="/admin/controlpanel"
          element={
            <AuthRequire>
              <AdminControlPanel />
            </AuthRequire>
          }
        />
        <Route path="/users/:userId" element={<UserProfile />} />

        <Route
          path="/createNewPost"
          element={
            <AuthRequire>
              <PostCreate />
            </AuthRequire>
          }
        />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/regulation" element={<Regulations />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
