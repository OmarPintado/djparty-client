import React, { useState, useEffect, useContext } from "react";
import RoomList from "../../components/room/RoomList";
import { useSocket } from "../../context/SocketContextProvider";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/common/search/SearchBar";
import { searchSongs } from "../../services/musicService";
import {
    getSongRequests,
    SongRequest,
    voteSongRequest,
} from "../../services/socketService";
import "./css/RoomPlayList.css";
import MainSpinner from "../../components/common/spinner/MainSpinner";
import { UserContext } from "../../context/UserContextProvider";

interface RoomPlayListProps {
    songRequests: SongRequest[];
}

const RoomPlayList: React.FC<RoomPlayListProps> = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { songRequests, setSongRequests, selectSong } = useSocket();
    const { setToastProps } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [, setIsSubmittingById] = useState<Record<string, boolean>>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentPlayingSong, setCurrentPlayingSong] = useState<string | null>(
        null
    );

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
        } catch (error: any) {
            console.error("Error al buscar canciones:", error.message);
            setErrorMessage(
                error.message ||
                    "Error al buscar canciones. Intenta nuevamente."
            );
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

        setIsSubmittingById((prev) => ({
            ...prev,
            [song.spotify_track_id]: true,
        }));
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
            getSongRequests((data: SongRequest[]) => {
                setSongRequests(data);
            });
        } catch (error: any) {
            console.error("Error al agregar canción:", error.message);
            setErrorMessage(
                error.message || "Error al agregar canción. Intenta nuevamente."
            );
        } finally {
            setIsSubmittingById((prev) => ({
                ...prev,
                [song.spotify_track_id]: false,
            }));
        }
    };

    // Maneja la selección de una canción y la reproduce
    const handleSelectSong = (songId: string) => {
        if (!roomId) {
            setErrorMessage("roomId no está definido.");
            return;
        }
        selectSong(songId, (response) => {
            if (response && response.spotify_url) {
                setCurrentPlayingSong(response.spotify_url);
            } else {
                setErrorMessage(
                    "No se pudo reproducir la canción. URL no válida."
                );
            }
        });
    };

    const handleVoteSong = (songId: string) => {
        if (!roomId) {
            setErrorMessage("roomId no está definido.");
            return;
        }
        voteSongRequest(songId, (response) => {
            const responseSongId = response?.song_request_id;
            if (responseSongId === songId) {
                setToastProps({
                    message: "El voto se registró correctamente.",
                    class: "success",
                });
            } else {
                setErrorMessage("Error al registrar el voto.");
            }
        });
    };

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

            {isSearching ? (
                <div className="m-auto">
                    <MainSpinner />
                </div>
            ) : (
                searchResults.length > 0 && (
                    <>
                        <h3>Resultados de búsqueda</h3>
                        <div className="search-results-container">
                            <RoomList
                                rooms={searchResults.map((song, index) => ({
                                    id: song.spotify_track_id,
                                    image:
                                        song.album?.image || "/music-art.jpg",
                                    title: song.name || "No title",
                                    subtitle:
                                        song.artists
                                            ?.map((artist: any) => artist.name)
                                            .join(", ") || "Unknown Artist",
                                    options: [],
                                    number: index + 1,
                                    showAddButton: true,
                                    onAddClick: () =>
                                        handleAddSongRequest(song),
                                    is_private: false,
                                    usercount: 1,
                                }))}
                            />
                        </div>
                    </>
                )
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
                                action: () => handleVoteSong(songRequest.id),
                            },
                            {
                                label: "Seleccionar",
                                action: () => handleSelectSong(songRequest.id),
                            },
                        ],
                        number: index + 1,
                        showAddButton: false,
                        is_private: false,
                        usercount: 1,
                    }))}
                />
            ) : (
                <p>No hay canciones solicitadas para esta sala.</p>
            )}

            {currentPlayingSong && (
                <div>
                    <h4>Reproduciendo:</h4>
                    <audio controls autoPlay src={currentPlayingSong}>
                        Tu navegador no soporta el reproductor de audio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default RoomPlayList;
