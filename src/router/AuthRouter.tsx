import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage.tsx";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import MainLayout from "../components/layout/MainLayout.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";


import CreateRoom from "../pages/CreateRoom.tsx";
import RoomHome from "../pages/RoomPages/RoomHome.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<RoomHome />} />
                <Route path="create-room" element={<CreateRoom />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
            </Route>
        </Routes>
    );

};
