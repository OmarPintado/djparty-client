import React, { useEffect, useState } from "react";
import RoomList from "../../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/common/inputs/InputSearch";
import { Link, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import "./css/RoomHome.css";

interface SongRequest {
    id: string;
    title: string;
    artist: string;
}

interface User {
    id: string;
    fullName: string;
    isActive: boolean;
}

export const RoomHome: React.FC = () => {
    const { roomId } = useParams();
    console.log("Room ID:", roomId);
    const [backgroundImage, setBackgroundImage] = useState<string | null>("/maracumango.jpg");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("AUTH_TOKEN");

        if (!token) {
            console.error("No se encontró el token de autenticación.");
            return;
        }

        // Configura el socket con la sala específica
        const newSocket = io("http://localhost:3000", {
            query: { music_room_id: roomId },
            extraHeaders: { Authorization: `Bearer ${token}` }
        });
        
        setSocket(newSocket);

        // Evento para obtener la lista de canciones solicitadas
        newSocket.emit("GETSONGREQUESTLIST");
        newSocket.on("GETSONGREQUESTLIST", (data: SongRequest[]) => {
            setSongRequests(data);
        });

        // Evento para obtener la lista de usuarios en la sala
        newSocket.emit("GETUSERSBYROOM");
        newSocket.on("GETUSERSBYROOM", (data: User[]) => {
            setUsers(data);
        });

        // Manejo de errores
        newSocket.on("ERROR", (error) => {
            console.error("Socket error:", error);
        });

        // Limpieza al desmontar el componente
        return () => {
            newSocket.disconnect();
            setSocket(null);
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
            <Link to={"users"}>View Users</Link>
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
                            { label: "Votar", action: () => socket?.emit("VOTESONGREQUEST", songRequest.id) },
                            { label: "Seleccionar", action: () => socket?.emit("SELECTEDSONGREQUEST", songRequest.id) },
                        ],
                        number: 1,
                        showAddButton: false,
                        onAddClick: () => console.log(`Agregar ${songRequest.title}`)
                    }))} 
                />
            </Container>
        </div>
    );
};

export default RoomHome;
