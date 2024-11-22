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

