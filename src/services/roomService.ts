import { isAxiosError } from "axios";
import { IsInRoom, JoinRoomProps, JoinRoomResponse, MusicRoom } from "../types";
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

export const isInRoom = async (id_room: string| undefined): Promise<IsInRoom> => {
    try {
        const { data } = await clientApi.get<IsInRoom>(`/music-room/is-in-room/${id_room}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Error desconocido");
    }
};
export const joinRoom = async (dataPost: JoinRoomProps): Promise<JoinRoomResponse> => {
    try {
        const { data } = await clientApi.post<JoinRoomResponse>(`/music-room/join`,dataPost);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error desconocido");
    }
};