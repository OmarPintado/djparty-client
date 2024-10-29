import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <main className="min-h-screen bg-dark-800 p-4  flex justify-center items-center">
            <Outlet />
        </main>
    );
};

export default AuthLayout;
