import React, { useEffect, useState } from "react";
import RoomList from "../../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/common/inputs/InputSearch";
import { Link, useParams } from "react-router-dom";
import {
    initializeSocket,
    getSongRequests,
    getUsersByRoom,
    handleSocketError,
    disconnectSocket,
    SongRequest,
    User,
} from "../../services/socketService";
import "./css/RoomHome.css";

export const RoomHome: React.FC = () => {
    const { roomId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState<string | null>("/maracumango.jpg");
    const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("AUTH_TOKEN");

        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }

        if (!roomId) {
            console.error("No se encontró el ID de la sala.");
            return;
        }

        const socket = initializeSocket(roomId, token);

        // Obtener la lista de canciones
        getSongRequests((data) => {
            console.log("Lista de canciones recibida:", data);
            setSongRequests(data);
        });

        // Obtener la lista de usuarios
        getUsersByRoom((data) => {
            console.log("Lista de usuarios recibida:", data);
            setUsers(data);
        });

        // Manejo de errores
        handleSocketError((error) => {
            console.error("Socket error:", error);
        });

        // Limpieza al desmontar el componente
        return () => {
            disconnectSocket();
        };
    }, [roomId]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    const handleSearchClick = (query: string) => {
        console.log("Buscando:", query);
    };

    return (
        <div className="room-home-container">
            <Link to={`users`}>View Users</Link>
            <div
                className="room-home-header"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="room-home-header-overlay">
                    <h1 className="room-home-title">Room {roomId}</h1>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="room-home-file-input"
                    />
                </div>
            </div>
            <Container>
                <SearchInput onSearch={handleSearchClick} />

                {/* Mostrar la lista de solicitudes de canciones */}
                <h3>Song Requests</h3>
                <RoomList
                    rooms={songRequests.map((songRequest) => ({
                        id: songRequest.id,
                        image: "/music-art.jpg",
                        title: songRequest.title,
                        subtitle: songRequest.artist,
                        options: [
                            { label: "Votar", action: () => console.log(`Votar: ${songRequest.id}`) },
                            { label: "Seleccionar", action: () => console.log(`Seleccionar: ${songRequest.id}`) },
                        ],
                        number: 1,
                        showAddButton: false,
                        onAddClick: () => console.log(`Agregar ${songRequest.title}`),
                    }))}
                />
            </Container>
        </div>
    );
};

export default RoomHome;
