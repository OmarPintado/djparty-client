import React, { useState } from 'react';
import RoomList from "../components/room/RoomList";
import { Container } from "react-bootstrap";
import SearchInput from "../components/common/inputs/InputSearch";

export const RoomHome: React.FC = () => {
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
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
 {/* Cabecera con imagen de fondo */}
            <div style={{ 
                position: 'relative', 
                height: '200px', 
                width: '100%', 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                borderTopLeftRadius: '15px', 
                borderTopRightRadius: '15px',
                overflow: 'hidden'
            }}>
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Room HAPPY</h1>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                    />
                </div>
            </div>
            <Container style={{ marginTop: '20px', padding: 0 }}>
                <SearchInput onSearch={handleSearchClick} />
                <RoomList />
            </Container>
        </div>
    );
};

//export default RoomHome;
