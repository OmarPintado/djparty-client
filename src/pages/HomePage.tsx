import './css/HomePage.css'; 
import { Container } from "react-bootstrap";
import RoomListRow from '../components/room/RoomListRow';
import MainButton from '../components/common/buttons/MainButton';
import SearchBar from '../components/common/search/SearchBar';
import useHomePage from './hook/useHomePage';
import React, { useEffect, useState } from "react";
import { MusicRoom } from "../types";
import { useQuery } from "@tanstack/react-query";
import * as RoomService from "../services/roomService";
import * as RoomServices from "../services/roomServices";
import RoomList from '../components/room/RoomList';

export const HomePage: React.FC = () => {
    const { handleCreateRoomClick } = useHomePage();
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Consulta para obtener las rooms populares
    const { data: popularRooms, isError: popularRoomsError } = useQuery<MusicRoom[], Error>({
        queryKey: ["popularRooms"],
        queryFn: RoomServices.getPopularRooms,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    // Consulta para buscar rooms por nombre
    const { data: searchResults, isError: searchError } = useQuery<MusicRoom[], Error>({
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
    
    return (
        <div className="home-container">
            {/* Botón de Crear Room */}
            <div className="home-create-room">
                <MainButton text="Create Room" type="submit" onClick={handleCreateRoomClick} />
            </div>

            {/* Sección de Popular Rooms */}
            <Container className="home-section">
                <h3>Popular Rooms</h3>
                {popularRooms ? (
                    <RoomListRow rooms={popularRooms.map(room => ({
                        image: "/music-art.jpg",  
                        title: room.name, 
                        subtitle: room.description, 
                        options: [] 
                    }))} />
                ) : (
                    <p>Cargando salas populares...</p>
                )}
            </Container>

            {/* Sección de All Rooms */}
            <Container>
                <h3>Rooms List</h3>
                <SearchBar onSearch={(query) => setSearchQuery(query)} />
                {searchResults ? (
                    <RoomList rooms={searchResults.map(room => ({
                        image: "/music-art.jpg", 
                        title: room.name,
                        subtitle: room.description,
                        options: [
                            { label: "Eliminar", action: () => alert(`Eliminar ${room.name}`) },
                            { label: "Compartir", action: () => alert(`Compartir ${room.name}`) },
                            { label: "Editar", action: () => alert(`Editar ${room.name}`) }
                        ],
                        number: 1,
                        showAddButton: true,
                        onAddClick: () => alert(`Agregar ${room.name} a la lista`)
                    }))} />
                ) : (
                    <p>Escriba algo para buscar salas de música...</p>
                )}
            </Container>
        </div>
    );
};
