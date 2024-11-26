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
    VoteSongResponse,
    MessageData,
} from "../services/socketService";
import { Socket } from "socket.io-client";

interface SocketContextType {
    socket?:Socket;
    songRequests: SongRequest[];
    setSongRequests: React.Dispatch<React.SetStateAction<SongRequest[]>>;
    users: User[];
    sendMessage: (data: MessageData) => void;
    voteSong: (songRequestId: string, onResponse: (response: VoteSongResponse) => void) => void;
    selectSong: (songRequestId: string, onResponse: (response: any) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const token = localStorage.getItem("AUTH_TOKEN");
    const [socket,setSocket] = useState<Socket>();
    useEffect(() => {
        if (!token || !roomId) {
            console.error("No se puede inicializar el socket. Faltan datos requeridos.");
            return;
        }

        setSocket(initializeSocket(roomId, token));

        getSongRequests((data: SongRequest[]) => {
            setSongRequests(data);
        });

        getUsersByRoom((data: User[]) => {
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

    const sendMessage = (data:MessageData) => {
        sendMessageToRoom(data, (response) => {
            console.log("Mensaje enviado a la sala:", response);
        });
    };

    const voteSong = (songRequestId: string, onResponse: (response: VoteSongResponse) => void) => {
        voteSongRequest(songRequestId, onResponse);
    };

    const selectSong = (songRequestId: string, onResponse: (response: any) => void) => {
        selectSongRequest(songRequestId, (response) => {
            console.log("Respuesta recibida del servidor para SELECTEDSONGREQUEST:", response);
            onResponse(response); 
        });
    };
    
    

    return (
        <SocketContext.Provider value={{ songRequests,socket, setSongRequests, users, sendMessage, voteSong, selectSong }}>
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
