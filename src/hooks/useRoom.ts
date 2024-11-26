import * as RoomService from "../services/roomService";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  IsInRoom, JoinRoomProps, JoinRoomResponse, MusicRoom } from "../types";
export const useSearchRoomByName = (query: string) => {
    const { data, isError, isLoading } = useQuery<MusicRoom[], Error>({
        queryKey: ["searchByName", query],
        queryFn: () => RoomService.searchByName(query),
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return { data, isError, isLoading };
};

export const useIsInRoom= (id_room: string| undefined, options = {}) => {
    const { data, isError, isLoading } = useQuery<IsInRoom, Error>({
        queryKey: ["is-in-room", id_room],
        queryFn: () => RoomService.isInRoom(id_room),
        retry: 1,
        refetchOnWindowFocus: false,
        
            ...options,
        
    });
    return { data, isError, isLoading };
};
export const useJoinRoom = () => {
    return useMutation<JoinRoomResponse,Error,JoinRoomProps>({
        mutationFn: RoomService.joinRoom,
    });
};