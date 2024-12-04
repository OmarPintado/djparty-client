import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import RoomPlayList from "./RoomPlayList";
import RoomUser from "./RoomUsers";
import RoomChat from "./RoomChat";
import "./css/RoomHome.css";
import { useSocket } from "../../context/SocketContextProvider";
import MainButton from "../../components/common/buttons/MainButton";
import { useIsInRoom } from "../../hooks/useRoom";
import MainSpinner from "../../components/common/spinner/MainSpinner";
import AccessDeniedPage from "../AuthPages/AccessDeniedPage";
import { getRoomDetails, activateRoom } from "../../services/roomServices";
import { MusicRoom } from "../../types";
import { UserContext } from "../../context/UserContextProvider";

export const RoomHome: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { data: isInRoom, isLoading } = useIsInRoom(roomId, {
        enabled: !!roomId,
    });
    const { user, setToastProps } = useContext(UserContext);
    const { songRequests, users } = useSocket();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [roomDetails, setRoomDetails] = useState<MusicRoom | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [backgroundImageLoading, setBackgroundImageLoading] =
        useState<boolean>(true);

    const fetchRoomDetails = async () => {
        if (!roomId) {
            setErrorMessage("Room ID is missing");
            return;
        }

        try {
            const data = await getRoomDetails(roomId);
            setRoomDetails(data);
        } catch (error: any) {
            setErrorMessage(
                error.message || "Error al obtener los detalles de la sala."
            );
        }
    };

    const handleEditRoom = () => {
        navigate(`edit`);
    };

    const handleActivateRoom = async () => {
        try {
            if (!roomId) {
                throw new Error("Room ID is missing");
            }

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user || !user.id) {
                throw new Error("User is not authenticated");
            }

            const data = await activateRoom(roomId, user.id);
            if (roomDetails) {
                setRoomDetails({
                    ...roomDetails,
                    is_open: !roomDetails?.is_open,
                });
            }
            setToastProps({ class: "success", message: data });
        } catch (error: any) {
            setToastProps({
                class: "error",
                message: "Error al activar la sala.",
            });
        }
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    useEffect(() => {
        if (roomDetails?.image_url) {
            setBackgroundImageLoading(true);
            const img = new Image();
            img.src = roomDetails.image_url!;
            img.onload = () => {
                setBackgroundImage(roomDetails.image_url!);
                setBackgroundImageLoading(false);
            };
            img.onerror = () => {
                setBackgroundImage("/music-art.jpg");
                setBackgroundImageLoading(false);
            };
        } else {
            setBackgroundImage("/music-art.jpg");
            setBackgroundImageLoading(false);
        }
    }, [roomDetails]);

    if (isLoading || backgroundImageLoading) return <MainSpinner />;

    if (isInRoom && !isLoading) {
        return (
            <div className="room-home-container">
                <div
                    className="room-home-header mb-3"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="room-home-header-overlay">
                        <h1 className="room-home-title">{roomDetails?.name}</h1>
                        <p className="room-home-description">
                            {roomDetails?.description}
                        </p>
                    </div>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {roomDetails?.created_by === user!.id && (
                    <div className="d-flex w-100 justify-content-between align-content-between">
                        <MainButton
                            text={
                                roomDetails.is_open
                                    ? "Desactivate Room"
                                    : "Activate Room"
                            }
                            type="button"
                            onClick={handleActivateRoom}
                        />
                        <MainButton
                            text={"Editar Room"}
                            type="button"
                            onClick={handleEditRoom}
                        />
                    </div>
                )}
                <div className="mt-4">
                    <Tabs
                        defaultActiveKey="playlist"
                        id="room-tabs"
                        className="mb-3"
                    >
                        <Tab eventKey="playlist" title="Playlist">
                            <RoomPlayList songRequests={songRequests} />
                        </Tab>
                        {/*<Tab eventKey="users" title="Usuarios">
                            <RoomUser users={users} />
                        </Tab>*/}
                        <Tab eventKey="chat" title="Chat">
                            <RoomChat roomId={roomId || ""} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }

    if (!isInRoom && !isLoading) return <AccessDeniedPage />;

    return <MainSpinner />;
};

export default RoomHome;
