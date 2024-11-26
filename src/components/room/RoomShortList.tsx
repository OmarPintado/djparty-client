import React, { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { RoomPreview } from "./RoomListRow";
import ShortCardItem from "../common/Card/ShortCardItem";
import "./css/RoomListRow.css";

interface RoomShortListProps {
    rooms: RoomPreview[];
}

export const RoomShortList: React.FC<RoomShortListProps> = ({ rooms = [] }) => {
    const { setRoomPreview } = useContext(UserContext);
    const handleCardClick = (room: RoomPreview) => {
        setRoomPreview(room);
    };

    return (
        <div className="room-list-row">
            {rooms.map((room, index) => (
                <ShortCardItem
                    key={index}
                    image={room.image}
                    title={room.title}
                    subtitle={room.subtitle}
                    onClick={() => {
                        if (room.onAddClick) {
                            room.onAddClick();
                        } else {
                            handleCardClick(room);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default RoomShortList;
