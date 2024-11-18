import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from '../common/Card/CardItem';
import './css/RoomListRow.css';

interface Room {
  id: string; 
  image: string;
  title: string;
  subtitle: string;
  options: { label: string; action: () => void }[];
}

interface RoomListRowProps {
  rooms: Room[];
}

const RoomListRow: React.FC<RoomListRowProps> = ({ rooms }) => {
  const navigate = useNavigate();

  const handleCardClick = (roomId: string) => {
    navigate(`/room-home/${roomId}`);
  };

  return (
    <div className="room-list-row">
      {rooms.map((room, index) => (
        <CardItem
          key={index}
          image={room.image}
          title={room.title}
          subtitle={room.subtitle}
          options={room.options}
          showAddButton={false}
          number={undefined}
          onClick={() => handleCardClick(room.id)} // Pasar onClick con roomId
        />
      ))}
    </div>
  );
};

export default RoomListRow;
