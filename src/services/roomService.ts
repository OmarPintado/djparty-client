import { isAxiosError } from "axios";
import { MusicRoom } from "../types";
import { clientApi } from "./api.";

export const searchByName = async (query: string): Promise<MusicRoom[]> => {
    try {
        const { data } = await clientApi.get<MusicRoom[]>(`/music-room/search?page=1&limit=10&query=${query}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error desconocido");
    }
};