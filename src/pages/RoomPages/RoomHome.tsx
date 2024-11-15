import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MusicRoom } from '../../types';

const RoomHome: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetails, setRoomDetails] = useState<MusicRoom | null>(null);

  useEffect(() => {
    if (roomId) {
      // Lógica para cargar detalles de la sala desde el servidor usando `roomId`
      console.log("Cargando detalles para la sala con ID:", roomId);
      // Aquí puedes hacer una llamada a la API para obtener los detalles de la sala
    }
  }, [roomId]);

  return (
    <div>
      <h1>Detalles de la Sala</h1>
      {roomDetails ? (
        <div>
          <h2>{roomDetails.name}</h2>
          <p>{roomDetails.description}</p>
          {/* Otros detalles de la sala */}
        </div>
      ) : (
        <p>Cargando detalles de la sala...</p>
      )}
    </div>
  );
};

export default RoomHome;
