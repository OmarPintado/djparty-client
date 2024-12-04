import React from "react";
import RoomList from "../../components/room/RoomList";
import { RoomUserProps } from "../../services/socketService";
import { useSocket } from "../../context/SocketContextProvider";


const RoomUser: React.FC<RoomUserProps> = () => {
    const {users} = useSocket();
  return (
    <div>
      <h3>Usuarios Conectados en la Sala</h3>
      {users.length > 0 ? (
        <RoomList
          rooms={users.map((user, index) => ({
            id: user.id,
            image: user.avatar || "/user.jpg", 
            title: user.fullName || "Usuario sin nombre", 
            subtitle: user.isActive ? "Activo" : "Inactivo", 
            options: [], 
            number: index + 1, 
            showAddButton: false,
          }))}
        />
      ) : (
        <p>No hay usuarios conectados en esta sala.</p>
      )}
    </div>
  );
};

export default RoomUser;
