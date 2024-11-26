import React from "react";
import RoomList from "../../components/room/RoomList";
import { RoomUserProps } from "../../services/socketService";


const RoomUser: React.FC<RoomUserProps> = ({ users }) => {
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
            is_private: false,
            usercount: 1, 
          }))}
        />
      ) : (
        <p>No hay usuarios conectados en esta sala.</p>
      )}
    </div>
  );
};

export default RoomUser;
