import { useContext, useState } from "react";
import "./css/UserMenu.css";
import { UserContext } from "../../context/UserContextProvider";
import { Link } from "react-router-dom";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logOut } = useContext(UserContext);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu">
            <button onClick={toggleMenu} className="user-button">
                Usuario <span>▼</span>
            </button>
            {isOpen && (
                <div
                    className="menu-options"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Link to={"/perfil"}>Perfil</Link>
                    <button onClick={logOut}>Cerrar sesión</button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
