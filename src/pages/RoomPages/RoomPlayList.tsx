import React, { useState, useEffect } from "react";
import RoomList from "../../components/room/RoomList";
import { useSocket } from "../../context/SocketContextProvider"; // Accedemos al contexto del socket
import { useParams } from "react-router-dom"; // Importamos useParams
import SearchBar from "../../components/common/search/SearchBar";
import { searchSongs, addSongToRoom } from "../../services/musicService";
import { getSongRequests } from "../../services/socketService"; // Asegúrate de tener esto importado
import "./css/RoomPlayList.css";

const RoomPlayList: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>(); // Extraemos roomId de los parámetros de la URL
    const { songRequests, setSongRequests } = useSocket(); // Usamos el contexto para obtener y actualizar las canciones
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isSubmittingById, setIsSubmittingById] = useState<Record<string, boolean>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Realiza la búsqueda de canciones
    const handleSearchSongs = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setErrorMessage(null);
        try {
            const results = await searchSongs(searchQuery);
            setSearchResults(results || []);
            console.log("Resultados de búsqueda:", results);
        } catch (error: any) {
            console.error("Error al buscar canciones:", error.message);
            setErrorMessage(error.message || "Error al buscar canciones. Intenta nuevamente.");
        } finally {
            setIsSearching(false);
        }
    };

    // Envía solicitud para agregar una canción a la sala
    const handleAddSongRequest = async (song: any) => {
        if (!roomId) {
            setErrorMessage("roomId no está definido.");
            return;
        }

        setIsSubmittingById((prev) => ({ ...prev, [song.spotify_track_id]: true }));
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user?.id;

            if (!userId) {
                throw new Error("Faltan datos requeridos (user_id).");
            }

            const payload = {
                spotify_track_id: song.spotify_track_id,
                name: song.name,
                album: song.album,
                artists: song.artists,
                user_id: userId,
                music_room_id: roomId,
            };

            console.log("Payload enviado al backend:", payload);
            await addSongToRoom(payload);

            console.log("Canción agregada exitosamente");

            // Llama a getSongRequests para obtener la lista actualizada desde el backend
            getSongRequests((data: SongRequest[]) => {
                console.log("Lista actualizada de canciones desde el servidor:", data);
                setSongRequests(data); // Actualiza el estado con la lista completa
            });
        } catch (error: any) {
            console.error("Error al agregar canción:", error.message);
            setErrorMessage(error.message || "Error al agregar canción. Intenta nuevamente.");
        } finally {
            setIsSubmittingById((prev) => ({
                ...prev,
                [song.spotify_track_id]: false,
            }));
        }
    };

    // Ver el estado de los resultados de búsqueda
    useEffect(() => {
        console.log("Resultados de búsqueda actualizados:", searchResults);
    }, [searchResults]);

    return (
        <div>
            <h3>Buscar y agregar canciones</h3>
            <SearchBar
                onSearch={(query) => {
                    setSearchQuery(query);
                    handleSearchSongs();
                }}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            {searchResults.length > 0 && (
                <>
                    <h3>Resultados de búsqueda</h3>
                    <div className="search-results-container">
                        <RoomList
                            rooms={searchResults.map((song, index) => ({
                                id: song.spotify_track_id,
                                image: song.album?.image || "/music-art.jpg",
                                title: song.name || "No title",
                                subtitle:
                                    song.artists?.map((artist: any) => artist.name).join(", ") ||
                                    "Unknown Artist",
                                options: [],
                                number: index + 1,
                                showAddButton: true,
                                onAddClick: () => handleAddSongRequest(song),
                            }))}
                        />
                    </div>
                </>
            )}

            <h3>Solicitudes de canciones</h3>
            {songRequests.length > 0 ? (
                <RoomList
                    rooms={songRequests.map((songRequest, index) => ({
                        id: songRequest.id,
                        image: songRequest.image || "/music-art.jpg",
                        title: songRequest.title || "Sin título",
                        subtitle:
                            songRequest.artists
                                ?.map((artist) => artist.artist)
                                .join(", ") || "Artista desconocido",
                        options: [
                            {
                                label: "Votar",
                                action: () => console.log(`Votar: ${songRequest.id}`),
                            },
                            {
                                label: "Seleccionar",
                                action: () => console.log(`Seleccionar: ${songRequest.id}`),
                            },
                        ],
                        number: index + 1,
                        showAddButton: false,
                    }))}
                />
            ) : (
                <p>No hay canciones solicitadas para esta sala.</p>
            )}
        </div>
    );
};

export default RoomPlayList;
