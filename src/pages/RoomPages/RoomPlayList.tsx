import React from "react";
import RoomList from "../../components/room/RoomList";
import { SongRequest } from "../../services/socketService";

interface RoomPlayListProps {
    songRequests: SongRequest[];
}

const RoomPlayList: React.FC<RoomPlayListProps> = ({ songRequests }) => {
    return (
        <div>
            <h3>Song Requests </h3>
            {songRequests.length > 0 ? (
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
                    }))}
                />
            ) : (
                <p>No hay canciones solicitadas para esta sala.</p>
            )}
        </div>
    );
};


export default RoomPlayList;
