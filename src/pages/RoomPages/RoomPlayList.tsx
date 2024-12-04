import React, { useState, useContext, useEffect } from "react";
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
    const { user } = useContext(UserContext);
    const { songRequests, setSongRequests } = useSocket();
    const { setToastProps } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [, setIsSubmittingById] = useState<Record<string, boolean>>({});
    const [currentPlayingSong] = useState<string | null>(null);

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

    const handleAddSongRequest = async (song: any) => {
        if (!roomId) {
            setToastProps({
                message: "Room desconocido.",
                class: "error",
            });
            return;
        }
        console.log(song);
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
                const groupedSongs = data.reduce<{
                    [key: string]: SongRequest & { votes: number };
                }>((acc, songRequest) => {
                    if (acc[songRequest.song_id]) {
                        acc[songRequest.song_id].votes += 1;
                    } else {
                        acc[songRequest.song_id] = {
                            ...songRequest,
                            votes: 1,
                        };
                    }
                    return acc;
                }, {});

                const uniqueSongs = Object.values(groupedSongs);

                uniqueSongs.sort((a, b) => b.votes - a.votes);

                setSongRequests(uniqueSongs);

                console.log(uniqueSongs);
            });
        } catch (error: any) {
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

    const handleVoteSong = async (song: SongRequest) => {
        if (!roomId) {
            setToastProps({
                message: "Room desconocido.",
                class: "error",
            });
            return;
        }
        voteSongRequest(song.id, (response) => {
            console.log(response);
            const responseSongId = response?.song_request_id;
            if (responseSongId == song.id) {
                setToastProps({
                    message: "El voto se registró correctamente.",
                    class: "success",
                });
                getSongRequests((data: SongRequest[]) => {
                    const groupedSongs = data.reduce<{
                        [key: string]: SongRequest & { votes: number };
                    }>((acc, songRequest) => {
                        if (acc[songRequest.song_id]) {
                            acc[songRequest.song_id].votes += 1;
                        } else {
                            acc[songRequest.song_id] = {
                                ...songRequest,
                                votes: 1,
                            };
                        }
                        return acc;
                    }, {});
                    const uniqueSongs = Object.values(groupedSongs);
                    uniqueSongs.sort((a, b) => b.votes - a.votes);
                    setSongRequests(uniqueSongs);
                });
            } else {
                setToastProps({
                    message: "No se pudo registrar el voto.",
                    class: "error",
                });
            }
        });
    };
    useEffect(() => {
        if (roomId && user?.id) {
            getSongRequests((data: SongRequest[]) => {
                const groupedSongs = data.reduce<{
                    [key: string]: SongRequest & { votes: number };
                }>((acc, songRequest) => {
                    if (acc[songRequest.song_id]) {
                        acc[songRequest.song_id].votes += 1;
                    } else {
                        acc[songRequest.song_id] = {
                            ...songRequest,
                            votes: 1,
                        };
                    }
                    return acc;
                }, {});
                const uniqueSongs = Object.values(groupedSongs);
                uniqueSongs.sort((a, b) => b.votes - a.votes);
                setSongRequests(uniqueSongs);
            });
        }
    }, [roomId, user!.id]);
    return (
        <div>
            <h3>Buscar y agregar canciones</h3>
            <SearchBar
                placeholder="Search music..."
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
                                action: () => handleVoteSong(songRequest),
                            },
                        ],
                        number: index + 1,
                        showAddButton: false,
                        usercount: songRequest.votes,
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
