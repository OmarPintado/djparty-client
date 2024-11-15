import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from '../common/Card/CardItem';


interface Room {
  id: string; // Asegúrate de que Room tiene un id único
  image: string;
  title: string;
  subtitle: string;
  options: { label: string; action: () => void }[];
  number: number;
  showAddButton: boolean;
  onAddClick: () => void;
}

interface RoomListProps {
  rooms: Room[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms = [] }) => {
  const navigate = useNavigate();

  const handleCardClick = (roomId: string) => {
    navigate(`/room-home/${roomId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
          onClick={() => handleCardClick(room.id)} // Pasa onClick con roomId
        />
      ))}
    </div>
  );
};

export default RoomList;
