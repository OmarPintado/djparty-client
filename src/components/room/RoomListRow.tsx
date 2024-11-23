import React, { useContext } from 'react';
import CardItem from '../common/Card/CardItem';
import './css/RoomListRow.css';
import { UserContext } from '../../context/UserContextProvider';

export interface RoomPreview {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  is_private: boolean;
  usercount: number | undefined;
  options?: { label: string; action: () => void }[]; 
  number?: number;  
  showAddButton?: boolean;  
  onAddClick?: () => void;  
}

interface RoomListRowProps {
  rooms: RoomPreview[];
}

const RoomListRow: React.FC<RoomListRowProps> = ({ rooms }) => {
  const {setRoomPreview} = useContext(UserContext);
  const handleCardClick = (room:RoomPreview) => {
    setRoomPreview(room)
  };

  return (
    <div className="room-list-row">
      {rooms.map((room,key) => (
        <CardItem
          key={key}
          image={room.image}
          title={room.title}
          subtitle={room.subtitle}
          options={room.options}
          showAddButton={false}
          number={undefined}
          onClick={() => handleCardClick(room)} // Pasar onClick con roomId
        />
      ))}
    </div>
  );
};

export default RoomListRow;
