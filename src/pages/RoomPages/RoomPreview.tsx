import { useContext, useEffect } from "react";
import "./css/RoomPreview.css";
import { UserContext } from "../../context/UserContextProvider";
import { IoMdCloseCircle } from "react-icons/io";
import { useIsInRoom, useJoinRoom } from "../../hooks/useRoom";
import { Link, useNavigate } from "react-router-dom";
import MainSpinner from "../../components/common/spinner/MainSpinner";

const RoomPreview = () => {
    const { roomPreview, setToastProps, setRoomPreview, user } =
        useContext(UserContext);
    const navigate = useNavigate();
    const { mutate, isPending } = useJoinRoom();

    const handleJoin = (roomId: string) => {
        mutate(
            {
                user_id: user?.id!,
                music_room_id: roomId,
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    setRoomPreview(null);
                    setToastProps({
                        message: "¡Te has unido exitosamente a la sala!",
                        class: "success",
                    });
                    navigate(`room-home/${roomId}`);
                },
                onError: (error) => {
                    console.error(error);
                    setToastProps({
                        message: `Error al unirte a la sala: ${error.message}`,
                        class: "error",
                    });
                },
            }
        );
    };

    const {
        data: isInRoom,
        isLoading,
    } = useIsInRoom(roomPreview?.id, {
        enabled: !!roomPreview,
    });

    useEffect(() => {
        if (roomPreview != null && isInRoom !== undefined) {
            console.log("IS IN ROOM:", isInRoom);
        }
    }, [roomPreview, isInRoom]);

    if (!roomPreview) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    className="modal-close-button"
                    onClick={() => setRoomPreview(null)}
                >
                    <IoMdCloseCircle className="text-danger" />
                </button>
                <div
                    className="modal-header"
                    style={{ backgroundImage: `url(${roomPreview.image})` }}
                >
                    <div className="modal-header-overlay">
                        <h1 className="modal-title">{roomPreview.title}</h1>
                        <h2 className="modal-subtitle">
                            {roomPreview.subtitle}
                        </h2>
                    </div>
                </div>
                <div className="modal-body">
                    {isPending || isLoading ? (
                        <div className="modal-spinner">
                            <MainSpinner />
                        </div>
                    ) : isInRoom ? (
                        <p className="modal-message success">
                            Ya tienes acceso a esta sala.{" "}
                            <Link
                                to={`/room-home/${roomPreview.id}`}
                                className="modal-link"
                                onClick={() => setRoomPreview(null)}
                            >
                                Haz clic aquí para entrar
                            </Link>
                            .
                        </p>
                    ) : roomPreview.is_private ? (
                        <button className="modal-button">
                            Solicitar Acceso
                        </button>
                    ) : (
                        <button
                            className="modal-button"
                            onClick={() => handleJoin(roomPreview.id)}
                        >
                            Unirse a la Sala
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomPreview;
