import { clientApi } from "./api.";
import { isAxiosError } from "axios";

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

export const searchSongs = async (query: string): Promise<any[]> => {
    try {
        const { data } = await clientApi.get(`/spotify/search?q=${encodeURIComponent(query)}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al buscar canciones");
        }
        throw new Error("Error desconocido");
    }
};

export const addSongToRoom = async (songData: {
    spotify_track_id: string;
    name: string;
    album: any;
    artists: any[];
    user_id: string;
    music_room_id: string;
}): Promise<void> => {
    try {
        await clientApi.post('/song/send-song-request', songData);
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Error al agregar canción");
        }
        throw new Error("Error desconocido");
    }
};