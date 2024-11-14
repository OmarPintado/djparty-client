import { clientApi } from "./api.";
import { isAxiosError } from "axios";

// Servicio para ejecutar la seed de géneros
export const executeGenreSeed = async () => {
    try {
        const { data } = await clientApi.get("/spotify/executeGenreSeed");
        return data;
    } catch (error) {
        if(isAxiosError(error)&&error.response){
            throw new Error("Error al ejecutar la seed de géneros");
        }
    }
};

// Servicio para buscar canciones
export const searchSong = async (songName: string) => {
    try {
        const { data } = await clientApi.get(`/spotify/search?q=${songName}`);
        return data;
    } catch (error) {
        if(isAxiosError(error)&&error.response){
            throw new Error("Error al buscar la canción");
        }
    }
};

// Servicio para crear una solicitud de canción
export const songRequest = async (userId: string, musicRoomId: string, songId: string) => {
    try {
        const { data } = await clientApi.post("/spotify/songRequest", {
            user_id: userId,
            music_room_id: musicRoomId,
            song_id: songId
        });
        return data;
    } catch (error) {
        if(isAxiosError(error)&&error.response){
            throw new Error("Error al crear la solicitud de canción");
        }
    }
};

