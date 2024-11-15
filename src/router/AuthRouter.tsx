import { Route, Routes } from "react-router-dom";
import  Login  from "../pages/AuthPages/Login.tsx";
import AuthLayout from "../components/layout/AuthLayout.tsx";
import MainLayout from "../components/layout/MainLayout.tsx";
import SignUp from "../pages/AuthPages/SignUp.tsx";
import CreateRoom from "../pages/CreateRoom.tsx";
import Perfil from "../pages/Perfil.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import RoomHome from "../pages/RoomPages/RoomHome.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="create-room" element={<CreateRoom />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="room-home/:roomId" element={<RoomHome />} />
            </Route>

            <Route path="auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
};
