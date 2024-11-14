import { clientApi } from "./api.";


export const createRoom = async (roomData: object) => {
    try {
        const response = await clientApi.post('/music-room/create', roomData);
        return response.data;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};
