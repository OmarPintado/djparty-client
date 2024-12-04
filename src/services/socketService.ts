import { io, Socket } from "socket.io-client";

export interface SongRequest {
    votes?: number;
    id: string;
    song_id:string;
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


const ensureSocketInitialized = (): Socket => {
    if (!socket) {
        throw new Error("Socket no inicializado. Asegúrate de llamar a 'initializeSocket' primero.");
    }
    return socket;
};


export const initializeSocket = (roomId: string, token: string): Socket => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            query: { music_room_id: roomId },
            extraHeaders: { Authorization: `Bearer ${token}` },
        });
    }
    return socket;
};


export const getSongRequests = (onSuccess: (data: SongRequest[]) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("GETSONGREQUESTLIST");
    initializedSocket.on("GETSONGREQUESTLIST", onSuccess);
};

export const getUsersByRoom = (onSuccess: (data: User[]) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("GETUSERSBYROOM");
    initializedSocket.on("GETUSERSBYROOM", onSuccess);
};

export const sendMessageToRoom = (data: MessageData, onResponse: (response: MessageData) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("SENDMESSAGEROOM", data);
    initializedSocket.on("SENDMESSAGEROOM", onResponse);
};

export const voteSongRequest = (songRequestId: string, onResponse: (response: VoteSongResponse) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("VOTESONGREQUEST", { song_request_id: songRequestId });
    initializedSocket.on("VOTESONGREQUEST", onResponse);
};

export const selectSongRequest = (songRequestId: string, onResponse: (response: any) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit("SELECTEDSONGREQUEST", songRequestId); 
    initializedSocket.on("SELECTEDSONGREQUEST", onResponse);
};


export const emitEvent = (event: string, data?: any): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.emit(event, data);
};

export const handleSocketError = (onError: (error: any) => void): void => {
    const initializedSocket = ensureSocketInitialized();
    initializedSocket.on("ERROR", onError);
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
