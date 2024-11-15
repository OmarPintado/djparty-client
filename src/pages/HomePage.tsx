import React, { useEffect, useState } from "react";
import "./css/HomePage.css";
import { Container } from "react-bootstrap";
import RoomList from "../components/room/RoomList";
import MainButton from "../components/common/buttons/MainButton";
import RoomListRow from "../components/room/RoomListRow";
import SearchBar from "../components/common/search/SearchBar";
import { MusicRoom } from "../types";
import { useQuery } from "@tanstack/react-query";
import * as RoomService from "../services/roomService";

const popularRooms = [
    {
        image: "https://via.placeholder.com/150",
        title: "Ambient Around T...",
        subtitle: "Alexander Gorshkov",
        options: [
            { label: "Eliminar", action: () => alert("Eliminar Ambient") },
            { label: "Compartir", action: () => alert("Compartir Ambient") },
        ],
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Reflections",
        subtitle: "Niki McNally",
        options: [
            { label: "Eliminar", action: () => alert("Eliminar Reflections") },
            {
                label: "Compartir",
                action: () => alert("Compartir Reflections"),
            },
        ],
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Reflections",
        subtitle: "Niki McNally",
        options: [
            { label: "Eliminar", action: () => alert("Eliminar Reflections") },
            {
                label: "Compartir",
                action: () => alert("Compartir Reflections"),
            },
        ],
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Reflections",
        subtitle: "Niki McNally",
        options: [
            { label: "Eliminar", action: () => alert("Eliminar Reflections") },
            {
                label: "Compartir",
                action: () => alert("Compartir Reflections"),
            },
        ],
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Reflections",
        subtitle: "Niki McNally",
        options: [
            { label: "Eliminar", action: () => alert("Eliminar Reflections") },
            {
                label: "Compartir",
                action: () => alert("Compartir Reflections"),
            },
        ],
    },
];

export const HomePage: React.FC = () => {
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { data, isError, isLoading } = useQuery<MusicRoom[], Error>({
        queryKey: ["searchByName", searchQuery],
        queryFn: () => RoomService.searchByName(searchQuery),
        retry: 1,
        enabled: searchQuery.length > 0,
        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        if (data) {
            console.log("Resultados de la búsqueda:", data);
        }
        if (isError) {
            console.error("Error al buscar salas de música.");
        }
    }, [data, isError]);
    return (
        <div className="home-container">
            {/* Botón de Crear Room */}
            <div className="home-create-room">
                <MainButton text="Create Room" type="submit" onClick={handleCreateRoomClick} />
            </div>

            {/* Sección de Popular Rooms */}
            <Container className="home-section">
                <h3>Popular Rooms</h3>
                <RoomListRow rooms={popularRooms} />
            </Container>

            {/* Sección de All Rooms */}
            <Container>
                <h3>Rooms List</h3>
                <SearchBar onSearch={handleSearch} />
                <RoomList />
            </Container>
        </div>
    );
};

//export default Home;
