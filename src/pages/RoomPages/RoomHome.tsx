import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";

import RoomPlayList from "./RoomPlayList";
import RoomUser from "./RoomUsers";
import RoomChat from "./RoomChat";
import "./css/RoomHome.css";
import { useSocket } from "../../context/SocketContextProvider";
import MainButton from "../../components/common/buttons/MainButton";
import { useIsInRoom } from "../../hooks/useRoom";
import MainSpinner from "../../components/common/spinner/MainSpinner";
import AccessDeniedPage from "../AuthPages/AccessDeniedPage";

interface RoomDetails {
    id: string;
    name: string;
    description: string;
    created_by: string;
    start_date: string;
    is_private: boolean;
    [key: string]: any; // Extensión para otros datos dinámicos
}

export const RoomHome: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { data: isInRoom, isLoading } = useIsInRoom(roomId, {
        enabled: !!roomId,
    });

    const { songRequests, users } = useSocket();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(
        "/maracumango.jpg"
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null); // Estado para los detalles de la room

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    // Llama al endpoint para obtener los detalles de la room
    const fetchRoomDetails = async () => {
        if (!roomId) {
            setErrorMessage("Room ID is missing");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/music-room/${roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "AUTH_TOKEN"
                        )}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los detalles de la room.");
            }

            const data: RoomDetails = await response.json();
            console.log("Detalles de la room:", data);
            setRoomDetails(data);
        } catch (error: any) {
            console.error(
                "Error al obtener los detalles de la room:",
                error.message
            );
            setErrorMessage(
                error.message ||
                    "No se pudieron cargar los detalles de la room."
            );
        }
    };

    const handleActivateRoom = async () => {
        try {
            if (!roomId) {
                throw new Error("Room ID is missing");
            }

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user || !user.id) {
                throw new Error("User is not authenticated");
            }

            const token = localStorage.getItem("AUTH_TOKEN");
            if (!token) {
                throw new Error("Authorization token is missing");
            }

            const response = await fetch(
                `http://localhost:3000/music-room/change-room-state/${roomId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        user_id: user.id, // Pass the user ID to verify ownership
                    }),
                }
            );

            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                const errorDetails =
                    contentType && contentType.includes("application/json")
                        ? await response.json()
                        : await response.text();
                console.error("Error del servidor:", errorDetails);
                throw new Error(
                    errorDetails.message ||
                        errorDetails ||
                        "Failed to activate the room"
                );
            }

            const result =
                contentType && contentType.includes("application/json")
                    ? await response.json()
                    : await response.text();

            console.log("Room activated successfully:", result);
            setSuccessMessage(
                typeof result === "string"
                    ? result
                    : "Room activated successfully!"
            );
        } catch (error: any) {
            console.error("Error activating room:", error.message);
            setErrorMessage(error.message || "Failed to activate the room");
        }
    };

    // Llama a fetchRoomDetails cuando el componente se monta
    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    if (isLoading) return <MainSpinner />;
    if (isInRoom)
        return (
            <div className="room-home-container">
                <div
                    className="room-home-header"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="room-home-header-overlay">
                        <h1 className="room-home-title">
                            Room {roomDetails?.name || roomId}
                        </h1>
                        <p className="room-home-description">
                            {roomDetails?.description ||
                                "Sin descripción disponible"}
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="room-home-file-input"
                        />
                    </div>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && (
                    <p className="text-success">{successMessage}</p>
                )}
                <MainButton
                    text="Activate Room"
                    type="button"
                    onClick={handleActivateRoom}
                />
                <Container>
                    <Tabs
                        defaultActiveKey="playlist"
                        id="room-tabs"
                        className="mb-3"
                    >
                        <Tab eventKey="playlist" title="Playlist">
                            <RoomPlayList songRequests={songRequests} />
                        </Tab>
                        <Tab eventKey="users" title="Usuarios">
                            <RoomUser users={users} />
                        </Tab>
                        <Tab eventKey="chat" title="Chat">
                            <RoomChat roomId={roomId || ""} />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    if (!isInRoom) return <AccessDeniedPage />;
    return <MainSpinner />;
};

export default RoomHome;
