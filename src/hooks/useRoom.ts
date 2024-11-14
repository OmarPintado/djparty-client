import * as RoomService from "../services/roomService";
import { useQuery } from "@tanstack/react-query";
import { MusicRoom } from "../types";

export const useSearchRoomByName = (query: string) => {
    const { data, isError, isLoading } = useQuery<MusicRoom[], Error>({
        queryKey: ["searchByName", query],
        queryFn: () => RoomService.searchByName(query),
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return { data, isError, isLoading };
};