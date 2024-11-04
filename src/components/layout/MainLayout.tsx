import "./css/MainLayout.css";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <main className="main-layout">
            <Outlet />
        </main>
    );
};

export default MainLayout;
