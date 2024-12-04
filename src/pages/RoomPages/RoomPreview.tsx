import { useContext } from "react";
import "./css/RoomPreview.css";
import { UserContext } from "../../context/UserContextProvider";
import { IoMdCloseCircle } from "react-icons/io";
import { useIsInRoom, useJoinRoom } from "../../hooks/useRoom";
import { Link, useNavigate } from "react-router-dom";
import MainSpinner from "../../components/common/spinner/MainSpinner";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const RoomPreview = () => {
    const { roomPreview, setToastProps, setRoomPreview, user } =
        useContext(UserContext);
    const navigate = useNavigate();
    const { mutate: mutateJoin, isPending: isPendingJoin } = useJoinRoom();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmitPassword: SubmitHandler<FieldValues> = (data) => {
        if (!user?.id) {
            setToastProps({
                message: "El usuario no está definido.",
                class: "error",
            });
            return;
        }
    
        if (!roomPreview?.id) {
            setToastProps({
                message: "La sala no está definida.",
                class: "error",
            });
            return;
        }
        
        mutateJoin(
            {
                user_id: user?.id,
                music_room_id: roomPreview?.id,
                password: data.password,
            },
            {
                onSuccess: (data) => {
                    setRoomPreview(null);
                    setToastProps({
                        message: data.message,
                        class: "success",
                    });
                    navigate(`room-home/${roomPreview?.id}`);
                },
                onError: (error) => {
                    setToastProps({
                        message: `${error.message}`,
                        class: "error",
                    });
                },
            }
        );
    };
    const handleJoin = (roomId: string) => {
        if (!user?.id) {
            setToastProps({
                message: "El usuario no está definido.",
                class: "error",
            });
            return;
        }
        mutateJoin(
            {
                user_id: user?.id,
                music_room_id: roomId,
            },
            {
                onSuccess: () => {
                    setRoomPreview(null);
                    setToastProps({
                        message: "¡Te has unido exitosamente a la sala!",
                        class: "success",
                    });
                    navigate(`room-home/${roomId}`);
                },
                onError: (error) => {
                    setToastProps({
                        message: `Error al unirte a la sala: ${error.message}`,
                        class: "error",
                    });
                },
            }
        );
    };

    const { data: isInRoom, isLoading } = useIsInRoom(roomPreview?.id, {
        enabled: !!roomPreview,
    });

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
                    {isPendingJoin || isLoading ? (
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
                        <div className="modal-private-access">
                            <p>
                                Esta sala es privada. Ingresa la contraseña para
                                unirte:
                            </p>
                            <form onSubmit={handleSubmit(onSubmitPassword)}>
                                <div className="modal-fields">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="modal-input"
                                        {...register("password", {
                                            required:
                                                "El password es obligatorio",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "El password debe tener al menos 8 caracteres",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message:
                                                    "El password debe incluir mayúsculas, minúsculas, un número y un carácter especial",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="error-message">
                                            {errors.password.message as string}
                                        </p>
                                    )}
                                </div>
                                <button type="submit" className="modal-button">
                                    Unirse a la Sala
                                </button>
                            </form>
                        </div>
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
