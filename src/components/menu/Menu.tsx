import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaHeart, FaDoorOpen, FaUser } from 'react-icons/fa';
import './Menu.css';

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu">
            <button onClick={toggleMenu} className="menu-icon">
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            {isOpen && (
                <div className="menu-options">
                    <a href="/home" className="menu-option">
                        <FaHome className="menu-option-icon" />
                        Inicio
                    </a>
                    <a href="/favorites" className="menu-option">
                        <FaHeart className="menu-option-icon" />
                        Mis músicas favoritas
                    </a>
                    <a href="/rooms" className="menu-option">
                        <FaDoorOpen className="menu-option-icon" />
                        Mis rooms
                    </a>
                    <a href="/profile" className="menu-option">
                        <FaUser className="menu-option-icon" />
                        Perfil
                    </a>
                </div>
            )}
        </div>
    );
};

export default Menu;
