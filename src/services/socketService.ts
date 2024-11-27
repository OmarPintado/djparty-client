// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

export interface SongRequest {
    id: string;
    image: string;
    title: string;
    artists:  Artist[]
}
export interface Artist{
    artist:string
}
export interface User {
    id: string;
    fullName: string;
    isActive: boolean;
    avatar: string;
    
}
export interface MessageData{
    roomId:string,
    message: string,
    userName: string
    userId:string,
    time:string
}
export interface RoomUserProps {
  users?: User[]; 
}
export interface VoteSongResponse{
    song_request_id :string
}
export const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
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

// Enviar un mensaje a la sala
export const sendMessageToRoom = (data: MessageData, onResponse: (response: MessageData) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("SENDMESSAGEROOM", data);
    initializedSocket.on("SENDMESSAGEROOM", onResponse);
};

// Votar una solicitud de canción
export const voteSongRequest = (songRequestId: string, onResponse: (response: VoteSongResponse) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("VOTESONGREQUEST", { song_request_id: songRequestId });
    initializedSocket.on("VOTESONGREQUEST", onResponse);
};

// Seleccionar una solicitud de canción
export const selectSongRequest = (songRequestId: string, onResponse: (response: any) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("SELECTEDSONGREQUEST", songRequestId); 
    initializedSocket.on("SELECTEDSONGREQUEST", onResponse);
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
    }
};
