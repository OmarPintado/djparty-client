import React, { useContext } from "react";
import CardItem from "../common/Card/CardItem";
import { UserContext } from "../../context/UserContextProvider";
import { RoomPreview } from "./RoomListRow";


interface RoomListProps {
    rooms: RoomPreview[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms = [] }) => {
    const { setRoomPreview } = useContext(UserContext);
    const handleCardClick = (room: RoomPreview) => {
        setRoomPreview(room);
    };

    return (
        <div style={{marginTop:"20p", display: "flex", flexDirection: "column", gap: "15px" }}>
            {rooms.map((room, index) => (
                <CardItem
                    key={index}
                    image={room.image}
                    title={room.title}
                    subtitle={room.subtitle}
                    options={room.options}
                    number={room.number}
                    showAddButton={room.showAddButton}
                    onAddClick={room.onAddClick}
                    onClick={() => handleCardClick(room)}
                />
            ))}
        </div>
    );
};

export default RoomList;
