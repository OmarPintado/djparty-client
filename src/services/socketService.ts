// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

export interface SongRequest {
    id: string;
    title: string;
    artist: string;
}

export interface User {
    id: string;
    fullName: string;
    isActive: boolean;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

let socket: Socket | null = null;


//Valida si el socket está inicializado. Lanza un error si no lo está.
const ensureSocketInitialized = (): Socket => {
    if (!socket) {
        throw new Error("Socket no inicializado. Asegúrate de llamar a 'initializeSocket' primero.");
    }
    return socket;
};


//Inicializa la conexión del socket para una sala específica.
export const initializeSocket = (roomId: string, token: string): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            query: { music_room_id: roomId },
            extraHeaders: { Authorization: `Bearer ${token}` },
        });

        console.log(`Socket conectado a ${SOCKET_URL}`);
    }
    return socket;
};


// Obtiene la lista de canciones solicitadas en la sala.

export const getSongRequests = (onSuccess: (data: SongRequest[]) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("GETSONGREQUESTLIST");
    initializedSocket.on("GETSONGREQUESTLIST", onSuccess);
};

//Obtiene la lista de usuarios en la sala.
export const getUsersByRoom = (onSuccess: (data: User[]) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("GETUSERSBYROOM");
    initializedSocket.on("GETUSERSBYROOM", onSuccess);
};

// Envía un evento personalizado al servidor.
export const emitEvent = (event: string, data?: any): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit(event, data);
};

//Maneja errores del socket.
export const handleSocketError = (onError: (error: any) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.on("ERROR", onError);
};

//Desconecta el socket y limpia la referencia.

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("Socket desconectado.");
    }
};
