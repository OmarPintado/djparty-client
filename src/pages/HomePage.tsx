import React from 'react';
import './css/HomePage.css'; 
import { Container} from "react-bootstrap";
import { IoSettingsSharp } from "react-icons/io5";
import RoomList from '../components/room/RoomList';
import MainButton from '../components/common/buttons/MainButton';
import RoomListRow from '../components/room/RoomListRow';
import SearchBar from '../components/common/search/SearchBar';
import useHomePage from './hook/useHomePage';


const popularRooms = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Ambient Around T...',
        subtitle: 'Alexander Gorshkov',
        options: [
            { label: 'Eliminar', action: () => alert('Eliminar Ambient') },
            { label: 'Compartir', action: () => alert('Compartir Ambient') },
        ],
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Reflections',
        subtitle: 'Niki McNally',
        options: [
            { label: 'Eliminar', action: () => alert('Eliminar Reflections') },
            { label: 'Compartir', action: () => alert('Compartir Reflections') },
        ],
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Reflections',
        subtitle: 'Niki McNally',
        options: [
            { label: 'Eliminar', action: () => alert('Eliminar Reflections') },
            { label: 'Compartir', action: () => alert('Compartir Reflections') },
        ],
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Reflections',
        subtitle: 'Niki McNally',
        options: [
            { label: 'Eliminar', action: () => alert('Eliminar Reflections') },
            { label: 'Compartir', action: () => alert('Compartir Reflections') },
        ],
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Reflections',
        subtitle: 'Niki McNally',
        options: [
            { label: 'Eliminar', action: () => alert('Eliminar Reflections') },
            { label: 'Compartir', action: () => alert('Compartir Reflections') },
        ],
    },
];

export const HomePage: React.FC = () => {
    const { handleSearch, handleCreateRoomClick } = useHomePage();

    return (
        <div className="home-container">
            {/* Cabecera con saludo e iconos */}
            <div className="home-header">
                <div className="home-header-greeting">
                    <h2>Hello Faisal!</h2>
                </div>
                <div className="home-header-icons">
                    <IoSettingsSharp className="home-icon" />
                </div>
            </div>

            {/* Botón de Crear Room */}
            <div className="home-create-room">
                <MainButton text="Create Room" type="submit" onClick={handleCreateRoomClick} />
            </div>

            {/* Sección de Popular Rooms */}
            <Container className="home-section">
                <h3>Popular Rooms</h3>
                <RoomListRow rooms={popularRooms} />
            </Container>

            {/* Sección de All Rooms */}
            <Container>
                <h3>Rooms List</h3>
                <SearchBar onSearch={handleSearch} />
                <RoomList />
            </Container>
        </div>
    );
};

//export default Home;
