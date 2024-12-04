import { isAxiosError } from "axios";
import { MusicRoom } from "../types";
import { clientApi } from "./api.";
export const createMusicRoom = async (
    roomData: FormData 
): Promise<MusicRoom> => {
    try {
        const { data } = await clientApi.post<MusicRoom>("/music-room/create", roomData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    }
};
export const updateMusicRoom = async (
    id:string,
    roomData: FormData 
): Promise<MusicRoom> => {
    try {
        const { data } = await clientApi.patch<MusicRoom>(`/music-room/${id}`, roomData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    }
};

export const getPopularRooms = async (): Promise<MusicRoom[]> => {
    try {
        const { data } = await clientApi.get<MusicRoom[]>('/music-room/popular-rooms?page=1&limit=10');
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error desconocido");
    }
};

export const getMyRooms = async (id_user:string): Promise<MusicRoom[]> => {
    try {
        const { data } = await clientApi.get<MusicRoom[]>(`/music-room/rooms/${id_user}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error desconocido");
    }
};
export const getRoomDetails = async (roomId: string): Promise<MusicRoom> => {
    try {
        const { data } = await clientApi.get<MusicRoom>(`/music-room/${roomId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al obtener detalles de la sala");
        }
        throw new Error("Error desconocido");
    }
};

export const activateRoom = async (roomId: string, userId: string): Promise<string> => {
    try {
        const {data}=  await clientApi.post(`/music-room/change-room-state/${roomId}`, {
            user_id: userId,
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al activar la sala");
        }
        throw new Error("Error desconocido");
    }
};
