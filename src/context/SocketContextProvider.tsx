import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    initializeSocket,
    getSongRequests,
    getUsersByRoom,
    disconnectSocket,
    SongRequest,
    User,
    sendMessageToRoom,
    voteSongRequest,
    selectSongRequest,
} from "../services/socketService";

interface SocketContextType {
    songRequests: SongRequest[];
    setSongRequests: React.Dispatch<React.SetStateAction<SongRequest[]>>; // Exponemos setSongRequests
    users: User[];
    sendMessage: (message: string) => void;
    voteSong: (songRequestId: string, onResponse: (response: string) => void) => void;
    selectSong: (songRequestId: string, onResponse: (response: any) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const token = localStorage.getItem("AUTH_TOKEN");

    useEffect(() => {
        console.log("Room ID:", roomId);
        console.log("Token:", token);
        if (!token || !roomId) {
            console.error("No se puede inicializar el socket. Faltan datos requeridos.");
            return;
        }

        const socket = initializeSocket(roomId, token);

        // Recibe las solicitudes de canciones y las almacena en el estado
        getSongRequests((data: SongRequest[]) => {
            console.log("Canciones recibidas del socket:", data);
            setSongRequests(data);
        });

        // Recibe los usuarios conectados y los almacena en el estado
        getUsersByRoom((data: User[]) => {
            console.log("Usuarios recibidos del socket:", data);
            setUsers(data);
        });

        return () => {
            disconnectSocket();
        };
    }, [roomId, token]);

    // Debugging: Observa los cambios en songRequests
    useEffect(() => {
        console.log("Estado songRequests actualizado:", songRequests);
    }, [songRequests]);

    // Debugging: Observa los cambios en users
    useEffect(() => {
        console.log("Estado users actualizado:", users);
    }, [users]);

    const sendMessage = (message: string) => {
        sendMessageToRoom(message, (response) => {
            console.log("Mensaje enviado a la sala:", response);
        });
    };

    const voteSong = (songRequestId: string, onResponse: (response: string) => void) => {
        voteSongRequest(songRequestId, onResponse);
    };

    const selectSong = (songRequestId: string, onResponse: (response: any) => void) => {
        selectSongRequest(songRequestId, onResponse);
    };

    return (
        <SocketContext.Provider value={{ songRequests, setSongRequests, users, sendMessage, voteSong, selectSong }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket debe usarse dentro de SocketProvider");
    }
    return context;
};
