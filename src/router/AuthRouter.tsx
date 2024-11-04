import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage.tsx";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import {RoomHome} from "../pages/RoomHome.tsx";

export const AuthRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<RoomHome />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};
