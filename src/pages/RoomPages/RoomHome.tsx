import React, { useState } from "react";
import RoomList from "../../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/common/inputs/InputSearch";
import "./css/RoomHome.css";
import { Link, useParams } from "react-router-dom";

export const RoomHome: React.FC = () => {
    const { roomId } = useParams();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(
        "/maracumango.jpg"
    );

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
                <RoomList />
            </Container>
        </div>
    );
};

export default RoomHome;
