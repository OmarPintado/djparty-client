import { Outlet } from "react-router";
import "./css/AuthLayout.css"; 

const AuthLayout = () => {
    return (
        <main className="auth-layout">
            <Outlet />
        </main>
    );
};

export default AuthLayout;