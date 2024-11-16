import React from 'react';
import CardItem from '../common/Card/CardItem';
import './css/RoomListRow.css';
import { useNavigate } from 'react-router-dom';


interface Room {
    image: string;
    title: string;
    subtitle: string;
    options: { label: string; action: () => void }[];
}

interface ListRoomRowProps {
    rooms: Room[];
}

const RoomListRow: React.FC<ListRoomRowProps> = ({ rooms }) => {
    const navigate = useNavigate()
    return (
        <div className="room-list-row">
            {rooms.map((room, index) => (
                <CardItem
                    key={index}
                    image={room.image}
                    title={room.title}
                    subtitle={room.subtitle}
                    options={[]}
                    showAddButton={false}
                    number={undefined}
                />
            ))}
        </div>
    );
};

export default RoomListRow;
