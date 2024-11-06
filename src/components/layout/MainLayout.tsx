//import Menu from "../menu/Menu"; 
import "./css/MainLayout.css";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div className="main-layout">
      {/*<Menu />  Agrega el menú aquí */}
      <main className="content">
        <Outlet />
      </main>
    </div>
    );
};

export default MainLayout;
