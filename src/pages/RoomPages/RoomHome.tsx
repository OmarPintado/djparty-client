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
import { getRoomDetails, activateRoom } from "../../services/roomServices";
import { MusicRoom } from "../../types";

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
    const [roomDetails, setRoomDetails] = useState<MusicRoom | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

    // Obtener detalles de la sala usando roomServices
    const fetchRoomDetails = async () => {
        if (!roomId) {
            setErrorMessage("Room ID is missing");
            return;
        }

        try {
            const data = await getRoomDetails(roomId);
            setRoomDetails(data);
        } catch (error: any) {
            console.error(
                "Error al obtener los detalles de la sala:",
                error.message
            );
            setErrorMessage(
                error.message || "Error al obtener los detalles de la sala."
            );
        }
    };

    // Activar la sala usando roomServices
    const handleActivateRoom = async () => {
        try {
            if (!roomId) {
                throw new Error("Room ID is missing");
            }

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user || !user.id) {
                throw new Error("User is not authenticated");
            }

            await activateRoom(roomId, user.id);
            setSuccessMessage("Room activated successfully!");
        } catch (error: any) {
            console.error("Error al activar la sala:", error.message);
            setErrorMessage(error.message || "Error al activar la sala.");
        }
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    if (isLoading)
        return (
            <div className="spinner-center">
                <MainSpinner />;
            </div>
        );
    if (!isInRoom) return <AccessDeniedPage />;
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
            {successMessage && <p className="text-success">{successMessage}</p>}
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
};

export default RoomHome;
