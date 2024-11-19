import React, { useState } from "react";
import RoomList from "../../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/common/inputs/InputSearch";
import "./css/RoomPreview.css";
import { Link, useParams } from "react-router-dom";

const RoomPreview = () => {
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
        <div className="room-preview-container">
            <div
                className="room-preview-header"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="room-preview-header-overlay">
                    <h1 className="room-preview-title">Room {roomId}</h1>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="room-preview-file-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomPreview;
