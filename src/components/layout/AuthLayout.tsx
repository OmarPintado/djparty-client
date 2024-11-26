import { Outlet } from "react-router";
import "./css/AuthLayout.css";
import AuthToast from "../common/toast/MainToast";

const AuthLayout = () => {
    return (
        <main className="auth-layout">
            <Outlet />
            <AuthToast />
        </main>
    );
};

export default AuthLayout;
