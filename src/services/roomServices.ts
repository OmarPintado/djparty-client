import { isAxiosError } from "axios";
import { MusicRoom } from "../types";
import { clientApi } from "./api.";

export const createMusicRoom = async (roomData: {
    created_by: string;
    name: string;
    description: string;
    start_date:string;
    is_private:boolean
}): Promise<MusicRoom> => {
    try {
        const { data } = await clientApi.post<MusicRoom>('/music-room/create', roomData);
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
            console.error("Error de respuesta:", error.response.data);
            throw new Error(error.response.data.error);
        }
        console.error("Error desconocido:", error);
        throw new Error("Error desconocido");
    }
};

export const getMyRooms = async (id_user:string): Promise<MusicRoom[]> => {
    try {
        const { data } = await clientApi.get<MusicRoom[]>(`/music-room/rooms/${id_user}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error de respuesta:", error.response.data);
            throw new Error(error.response.data.error);
        }
        console.error("Error desconocido:", error);
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

export const activateRoom = async (roomId: string, userId: string): Promise<void> => {
    try {
        await clientApi.post(`/music-room/change-room-state/${roomId}`, {
            user_id: userId,
        });
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al activar la sala");
        }
        throw new Error("Error desconocido");
    }
};
