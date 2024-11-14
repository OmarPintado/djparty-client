import { Route, Routes } from "react-router-dom";
import  Login  from "../pages/AuthPages/Login.tsx";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import MainLayout from "../components/layout/MainLayout.tsx";
import SignUp from "../pages/AuthPages/SignUp.tsx";

import CreateRoom from "../pages/CreateRoom.tsx";
import RoomHome from "../pages/RoomPages/RoomHome.tsx";
import Perfil from "../pages/Perfil.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<RoomHome />} />
                <Route path="create-room" element={<CreateRoom />} />

                <Route path="perfil" element={<Perfil />} />
            </Route>

            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
};
