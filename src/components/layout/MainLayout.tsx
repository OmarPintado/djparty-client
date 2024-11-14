import { useContext } from "react";
//import Menu from "../menu/Menu";
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
            <Header />
            <div className="main-layout">
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default MainLayout;
