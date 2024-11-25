import "./css/HomePage.css";
import { Container } from "react-bootstrap";
import RoomListRow from "../components/room/RoomListRow";
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
import { clientApi } from "../services/api.";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
    const { user } = useContext(UserContext);
    const { handleCreateRoomClick } = useHomePage();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>("");
    // Consulta para obtener las rooms populares
    const { data: popularRooms, isError: popularRoomsError } = useQuery<
        MusicRoom[],
        Error
    >({
        queryKey: ["popularRooms"],
        queryFn: RoomServices.getPopularRooms,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
    const { data: myRooms, isError: myRoomsError } = useQuery<
        MusicRoom[],
        Error
    >({
        queryKey: ["myRooms", user?.id!],
        queryFn: () => RoomServices.getMyRooms(user?.id!),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        enabled: !!user?.id, // Solo ejecuta la consulta si user.id existe
    });
    // Consulta para buscar rooms por nombre
    const { data: searchResults, isError: searchError } = useQuery<
        MusicRoom[],
        Error
    >({
        queryKey: ["searchByName", searchQuery],
        queryFn: () => RoomService.searchByName(searchQuery),
        enabled: searchQuery.length > 0,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (searchResults) {
            console.log("Resultados de la búsqueda:", searchResults);
        }
        if (searchError) {
            console.error("Error al buscar salas de música.");
        }
        if (popularRoomsError) {
            console.error("Error al cargar salas populares.");
        }
    }, [searchResults, searchError, popularRoomsError]);

    useEffect(() => {
        if (popularRooms) {
            console.log("Estructura de popularRooms:", popularRooms);
        }
    }, [popularRooms]);
    useEffect(() => {
        const fecthRoomByUser = async () => {
            try {
                const data = await clientApi(`/music-room/rooms/${user?.id}`);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fecthRoomByUser();
    }, []);
    return (
        <div className="home-container">
            {/* Botón de Crear Room */}
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
                        <RoomListRow
                            rooms={myRooms.map((room) => ({
                                id: room.id,
                                image: "/music-art.jpg",
                                title: room.name,
                                subtitle: room.description,
                                options: [],
                                usercount: room.usercount,
                                is_private: room.is_private,
                                onAddClick:()=> navigate(`room-home/${room.id}`),
                            }))}
                        />
                    ) : (
                        <p>Cargando salas populares...</p>
                    )}
                </Container>
            )}
            {/* Sección de Popular Rooms */}
            <Container className="home-section">
                <h3>Popular Rooms</h3>
                {popularRooms ? (
                    <RoomListRow
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

            {/* Sección de All Rooms */}
            <Container>
                <h3>Rooms List</h3>
                <SearchBar onSearch={(query) => setSearchQuery(query)} />
                {searchResults ? (
                    <RoomList
                        rooms={searchResults.map((room) => ({
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
                            number: 1,
                            showAddButton: true,
                            onAddClick: () =>
                                alert(`Agregar ${room.name} a la lista`),
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
