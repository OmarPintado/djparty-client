import React, { useState, useEffect } from "react";
import RoomList from "../../components/room/RoomList";
import { SongRequest } from "../../services/socketService";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/common/search/SearchBar";
import "./css/RoomPlayList.css";

interface RoomPlayListProps {
  songRequests: SongRequest[];
}

const RoomPlayList: React.FC<RoomPlayListProps> = ({ songRequests }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSubmittingById, setIsSubmittingById] = useState<
    Record<string, boolean>
  >({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { roomId } = useParams();

  // Realiza la búsqueda de canciones
  const handleSearchSongs = async () => {
    if (!searchQuery.trim()) {
        setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const response = await fetch(
        `http://localhost:3000/spotify/search?q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al buscar canciones");
      }
      const results = await response.json();
      setSearchResults(results || []);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error searching songs:", error);
      setErrorMessage("Error al buscar canciones. Intenta nuevamente.");
    } finally {
      setIsSearching(false);
    }
  };

  // Envía solicitud para agregar una canción a la sala
  const handleAddSongRequest = async (song: any) => {
    setIsSubmittingById((prev) => ({ ...prev, [song.spotify_track_id]: true }));
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;
  
      console.log("Valor de roomId:", roomId);
      console.log("Valor de userId:", userId);
  
      if (!userId || !roomId) {
        throw new Error("Faltan datos requeridos (user_id o music_room_id).");
      }
  
      // Valida que roomId sea un UUID
      const isValidUUID = (id: string) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  
      if (!isValidUUID(roomId)) {
        console.error("roomId no es un UUID válido:", roomId);
        throw new Error("El roomId no es un UUID válido");
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
  
      const response = await fetch("http://localhost:3000/song/send-song-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Error del servidor:", errorDetails);
        throw new Error(`Error al agregar la canción: ${response.statusText}`);
      }
  
      console.log("Song request added successfully");
    } catch (error) {
      console.error("Error adding song request:", error.message);
      setErrorMessage(error.message || "Error al agregar canción. Intenta nuevamente.");
    } finally {
      setIsSubmittingById((prev) => ({
        ...prev,
        [song.spotify_track_id]: false,
      }));
    }
  };  
  
  //ver el searchResults
  useEffect(() => {
    console.log("searchResults", searchResults);
  }, [searchResults]);

  return (
    <div>
      <h3>Search and Add Songs</h3>
      <SearchBar
        onSearch={(query) => {
          setSearchQuery(query);
          handleSearchSongs();
        }}
      />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {searchResults.length > 0 && (
        <>
          <h3>Search Results</h3>
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

      <h3>Song Requests</h3>
      {songRequests.length > 0 ? (
        <RoomList
          rooms={songRequests.map((songRequest) => ({
            id: songRequest.id,
            image: "/music-art.jpg",
            title: songRequest.title,
            subtitle: songRequest.artist,
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
            number: 1,
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
