import React from "react";
import { User } from "../../services/socketService";

interface RoomUserProps {
    users: User[];
}

const RoomUser: React.FC<RoomUserProps> = ({ users }) => {
    return (
        <div>
            <h3>Usuarios en la sala</h3>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.fullName} {user.isActive ? "(Activo)" : "(Inactivo)"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios en esta sala.</p>
            )}
        </div>
    );
};


export default RoomUser;
