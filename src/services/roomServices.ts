import { isAxiosError } from "axios";
import { MusicRoom } from "../types";
import { clientApi } from "./api.";

export const createMusicRoom = async (roomData: {
    created_by: string;
    name: string;
    description: string;
}): Promise<MusicRoom> => {
    try {
        const { data } = await clientApi.post<MusicRoom>('/music-room/create', roomData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error desconocido");
    }
};
