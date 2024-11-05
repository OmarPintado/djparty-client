import React, { useState } from 'react';
import RoomList from "../../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../../components/common/inputs/InputSearch";
import './css/RoomUsers.css';

export const RoomUsers: React.FC = () => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>('/maracumango.jpg');

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
        <div className="room-users-container">
            <div 
                className="room-users-header" 
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="room-users-header-overlay">
                    <h1 className="room-users-title">Room HAPPY</h1>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="room-users-file-input"
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

export default RoomUsers;
