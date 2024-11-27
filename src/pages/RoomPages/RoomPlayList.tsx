import React, { useState, useContext } from "react";
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
import { clientApi } from "../../services/api.";

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
        try {
            const results = await searchSongs(searchQuery);
            setSearchResults(results || []);
        } catch (error: any) {
            setToastProps({
                message: "Error al buscar canciones. Intenta nuevamente.",
                class: "error",
            });
        } finally {
            setIsSearching(false);
        }
    };

    // Envía solicitud para agregar una canción a la sala
    const handleAddSongRequest = async (song: any) => {
        if (!roomId) {
            setToastProps({
                message: "Room desconocido.",
                class: "error",
            });
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
            const { data } = await clientApi.post(
                `/song/send-song-request`,
                payload
            );
            setToastProps({ message: data.message, class: "success" });
            getSongRequests((data: SongRequest[]) => {
                setSongRequests(data);
            });
        } catch (error: any) {
            console.log(error);
            if (error.response.data.message) {
                setToastProps({
                    message: error.response.data.message,
                    class: "error",
                });
                return;
            }
            setToastProps({
                message: "No se pudo agregar la canción. Intenta nuevamente..",
                class: "error",
            });
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
            setToastProps({
                message: "Room no está definido.",
                class: "error",
            });
            return;
        }
        selectSong(songId, (response) => {
            if (response && response.spotify_url) {
                setCurrentPlayingSong(response.spotify_url);
            } else {
                setToastProps({
                    message: "No se pudo reproducir la canción. URL no válida.",
                    class: "error",
                });
            }
        });
    };

    const handleVoteSong = (songId: string) => {
        if (!roomId) {
            setToastProps({
                message: "Room desconocido.",
                class: "error",
            });
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
                setToastProps({
                    message: "No se pudo registrar el voto.",
                    class: "error",
                });
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
