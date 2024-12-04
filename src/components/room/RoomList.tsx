import React from "react";
import CardItem from "../common/Card/CardItem";
import { RoomPreview } from "./RoomListRow";


interface RoomListProps {
    rooms: RoomPreview[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms = [] }) => {
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
                    usercount = {room.usercount}
                    is_private={room.is_private}
                    showAddButton={room.showAddButton}
                    onAddClick={room.onAddClick}
                />
            ))}
        </div>
    );
};

export default RoomList;
