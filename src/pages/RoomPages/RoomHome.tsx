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

export const RoomHome: React.FC = () => {
    const { roomId } = useParams();
    const { songRequests, users } = useSocket();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(
        "/maracumango.jpg"
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
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

            // Aquí comprobamos si el backend envía texto en lugar de JSON
            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                const errorDetails =
                    contentType && contentType.includes("application/json")
                        ? await response.json()
                        : await response.text(); // Si es texto, lo manejamos
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
    const {
        data: isInRoom,
        isError,
        isLoading,
    } = useIsInRoom(roomId, {
        enabled: !!roomId,
    });
    if (isLoading) return <MainSpinner/>;
    if (!isInRoom) return <AccessDeniedPage/>;
    return (
        <div className="room-home-container">
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
