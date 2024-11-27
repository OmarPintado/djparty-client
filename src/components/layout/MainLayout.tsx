import { useContext } from "react";
import "./css/MainLayout.css";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import Header from "./Header";
import MainToast from "../common/toast/MainToast";
const MainLayout = () => {
    const { user } = useContext(UserContext);
    if (!user?.id) return <Navigate to="/auth/login" replace />;
    return (
        <>
            <Header />
            <div className="main-layout">
                <main className="content">
                    <Outlet />
                    <MainToast/>
                </main>
            </div>
        </>
    );
};

export default MainLayout;
