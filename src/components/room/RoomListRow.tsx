import React from "react";
import CardItem from "../common/Card/CardItem";
import "./css/RoomListRow.css";

export interface RoomPreview {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    is_private?: boolean|undefined;
    usercount?: number | undefined;
    options?: { label: string; action: () => void }[];
    number?: number;
    showAddButton?: boolean;
    onAddClick?: () => void;
}

interface RoomListRowProps {
    rooms: RoomPreview[];
}

const RoomListRow: React.FC<RoomListRowProps> = ({ rooms }) => {
    return (
        <div className="room-list-row">
            {rooms.map((room, key) => (
                <CardItem
                    key={key}
                    image={room.image}
                    title={room.title}
                    subtitle={room.subtitle}
                    options={room.options}
                    showAddButton={false}
                    number={undefined}
                    onAddClick={room.onAddClick}
                />
            ))}
        </div>
    );
};

export default RoomListRow;
