import { useContext } from "react";
import "./css/MainLayout.css";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import Header from "./Header";
const MainLayout = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    if (!user?.id) return <Navigate to="/auth/login" replace />;
    return (
        <>
            <Header/>
            <main className="main-layout">
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
