// RoomHome.tsx
import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";

import RoomPlayList from "./RoomPlayList";
import RoomUser from "./RoomUsers";
import RoomChat from "./RoomChat";
import "./css/RoomHome.css";
import { useSocket } from "../../context/SocketContextProvider";
import MainButton from "../../components/common/buttons/MainButton";

export const RoomHome: React.FC = () => {
    const { roomId } = useParams();
    const { songRequests, users, sendMessage } = useSocket();
    const [backgroundImage, setBackgroundImage] = useState<string | null>("/maracumango.jpg");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBackgroundImage(imageUrl);
        }
    };

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
            <MainButton text="Activate Room" type="submit" />
            <Container>
                <Tabs defaultActiveKey="playlist" id="room-tabs" className="mb-3">
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
