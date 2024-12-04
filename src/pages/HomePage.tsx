import "./css/HomePage.css";
import { Container } from "react-bootstrap";
import MainButton from "../components/common/buttons/MainButton";
import SearchBar from "../components/common/search/SearchBar";
import useHomePage from "./hook/useHomePage";
import React, { useContext, useEffect, useState } from "react";
import { MusicRoom } from "../types";
import { useQuery } from "@tanstack/react-query";
import * as RoomService from "../services/roomService";
import * as RoomServices from "../services/roomServices";
import RoomList from "../components/room/RoomList";
import RoomPreview from "./RoomPages/RoomPreview";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import RoomShortList from "../components/room/RoomShortList";

export const HomePage: React.FC = () => {
    const { user } = useContext(UserContext);
    const { setRoomPreview } = useContext(UserContext);

    const { handleCreateRoomClick } = useHomePage();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data: popularRooms } = useQuery<MusicRoom[], Error>({
        queryKey: ["popularRooms"],
        queryFn: RoomServices.getPopularRooms,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
    const { data: myRooms } = useQuery<MusicRoom[], Error>({
        queryKey: ["myRooms", user?.id!],
        queryFn: () => RoomServices.getMyRooms(user?.id!),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!user?.id,
    });
    const { data: searchResults } = useQuery<MusicRoom[], Error>({
        queryKey: ["searchByName", searchQuery],
        queryFn: () => RoomService.searchByName(searchQuery),
        enabled: searchQuery.length > 0,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);
    return (
        <div className="home-container">
            <div className="home-create-room">
                <MainButton
                    text="Create Room"
                    type="submit"
                    onClick={handleCreateRoomClick}
                />
            </div>
            {myRooms && myRooms.length > 0 && (
                <Container className="home-section">
                    <h3>My Rooms</h3>
                    {myRooms ? (
                        <RoomShortList
                            rooms={myRooms.map((room) => ({
                                id: room.id,
                                image: "/music-art.jpg",
                                title: room.name,
                                subtitle: room.description,
                                options: [],
                                usercount: room.usercount,
                                is_private: room.is_private,
                                onAddClick: () =>
                                    navigate(`room-home/${room.id}`),
                            }))}
                        />
                    ) : (
                        <p>Cargando salas populares...</p>
                    )}
                </Container>
            )}
            <Container className="home-section">
                <h3>Popular Rooms</h3>
                {popularRooms ? (
                    <RoomShortList
                        rooms={popularRooms.map((room) => ({
                            id: room.id,
                            image: "/music-art.jpg",
                            title: room.name,
                            subtitle: room.description,
                            options: [],
                            usercount: room.usercount,
                            is_private: room.is_private,
                        }))}
                    />
                ) : (
                    <p>Cargando salas populares...</p>
                )}
            </Container>

            <Container>
                <h3>Rooms List</h3>
                <SearchBar onSearch={(query) => setSearchQuery(query)} />
                {searchResults ? (
                    <RoomList
                        rooms={searchResults.map((room, index) => ({
                            index,
                            id: room.id,
                            image: "/music-art.jpg",
                            title: room.name,
                            subtitle: room.description,
                            options: [
                                {
                                    label: "Eliminar",
                                    action: () =>
                                        alert(`Eliminar ${room.name}`),
                                },
                                {
                                    label: "Compartir",
                                    action: () =>
                                        alert(`Compartir ${room.name}`),
                                },
                                {
                                    label: "Editar",
                                    action: () => alert(`Editar ${room.name}`),
                                },
                            ],
                            is_private: room.is_private,
                            usercount: room.usercount,
                            number: index + 1,
                            showAddButton: true,
                            onAddClick: () =>
                                setRoomPreview({
                                    id: room.id,
                                    is_private: room.is_private,
                                    subtitle: room.description,
                                    title: room.name,
                                    usercount: room.usercount,
                                    image: "/music-art.jpg",
                                }),
                        }))}
                    />
                ) : (
                    <p>Escriba algo para buscar salas de música...</p>
                )}
            </Container>
            {<RoomPreview />}
        </div>
    );
};
