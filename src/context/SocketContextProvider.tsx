import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    const {roomId} = useParams();
    const token = localStorage.getItem("AUTH_TOKEN");
    const [socket,setSocket] = useState<Socket>();
    useEffect(() => {
        if (!token || !roomId) {
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


    const sendMessage = (data:MessageData) => {
        sendMessageToRoom(data, () => {
        });
    };

    const voteSong = (songRequestId: string, onResponse: (response: VoteSongResponse) => void) => {
        voteSongRequest(songRequestId, onResponse);
    };

    const selectSong = (songRequestId: string, onResponse: (response: any) => void) => {
        selectSongRequest(songRequestId, (response) => {
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
