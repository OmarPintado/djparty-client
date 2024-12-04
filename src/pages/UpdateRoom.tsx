import "./css/CreateRoom.css";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import MainInput from "../components/common/inputs/MainInput";
import "../components/room/css/CreateRoomForm.css";
import MainButton from "../components/common/buttons/MainButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { updateMusicRoom, getRoomDetails } from "../services/roomServices";
import { useNavigate, useParams } from "react-router-dom";
import RadioButton from "../components/common/buttons/RadioButton";
import { isAxiosError } from "axios";
import { MusicRoom } from "../types";
import { Spinner } from "react-bootstrap";

const UpdateRoom = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [isPrivate, setIsPrivate] = useState<boolean>(true);
    const [roomDetails, setRoomDetails] = useState<MusicRoom | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>();
    const { user, setToastProps } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!roomId) return;
            setLoading(true);
            try {
                const data = await getRoomDetails(roomId);
                setRoomDetails(data);
                setValue("name", data.name);
                setValue("description", data.description);
                setValue("start_date", data.start_date!.split("T")[0]);
                setIsPrivate(data.is_private);
            } catch (error) {
                setToastProps({
                    message: "Error fetching room details.",
                    class: "error",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchRoomDetails();
    }, [roomId, setValue, setToastProps]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user || !user.id || !roomId) {
            setToastProps({
                message: "User not logged in or room ID missing.",
                class: "error",
            });
            return;
        }

        const startDateFormat = new Date(data.start_date)
            .toISOString()
            .split("T")[0];
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("start_date", startDateFormat);
        formData.append("is_private", isPrivate.toString());
        if (data.file && data.file[0]) {
            formData.append("file", data.file[0]);
        }
        if (isPrivate && data.password) {
            formData.append("password", data.password);
        }

        setLoading(true); 
        try {
            await updateMusicRoom(roomId, formData);
            setToastProps({
                message: "Room updated successfully.",
                class: "success",
            });
            navigate(`/room-home/${roomId}`);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setToastProps({
                    message: error.message || "Error updating room.",
                    class: "error",
                });
            } else {
                setToastProps({
                    message: "An unknown error occurred.",
                    class: "error",
                });
            }
        } finally {
            setLoading(false); 
        }
    };

    if (loading || !roomDetails) {
        return (
            <div className="loading-container">
                <div className="spinner">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div className="create-room-container">
            <h1>Update Room</h1>
            <form
                className="create-room-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-fields">
                    <label htmlFor="name" className="text-white fw-medium">
                        Name
                    </label>
                    <MainInput
                        type="text"
                        placeholder="Enter room name"
                        name="name"
                        register={register}
                        validation={{
                            required: "Room name is required",
                            minLength: {
                                value: 3,
                                message: "At least 3 characters",
                            },
                        }}
                        error={errors.name?.message as string}
                    />
                </div>

                <div className="form-fields">
                    <label
                        htmlFor="description"
                        className="text-white fw-medium"
                    >
                        Description
                    </label>
                    <MainInput
                        type="text"
                        placeholder="Enter room description"
                        name="description"
                        register={register}
                        validation={{
                            required: "Description is required",
                            maxLength: {
                                value: 50,
                                message: "Max 50 characters",
                            },
                        }}
                        error={errors.description?.message as string}
                    />
                </div>

                <div className="form-fields">
                    <label
                        htmlFor="start_date"
                        className="text-white fw-medium"
                    >
                        Start Date
                    </label>
                    <MainInput
                        type="date"
                        name="start_date"
                        register={register}
                        validation={{
                            required: "Start date is required",
                        }}
                        error={errors.start_date?.message as string}
                    />
                </div>

                <div className="form-fields">
                    <label htmlFor="file" className="text-white fw-medium">
                        Image (optional)
                    </label>
                    <MainInput
                        type="file"
                        name="file"
                        register={register}
                        validation={{
                            validate: (value: FileList | null) => {
                                if (!value || value.length === 0) return true;
                                const fileType = value[0]?.type;
                                if (
                                    ![
                                        "image/jpeg",
                                        "image/png",
                                        "image/gif",
                                    ].includes(fileType)
                                ) {
                                    return "Only JPG, PNG, or GIF allowed";
                                }
                                const fileSize = value[0]?.size;
                                if (fileSize && fileSize > 4000000) {
                                    return "Max file size: 4MB";
                                }
                                return true;
                            },
                        }}
                        error={errors.file?.message as string}
                    />
                </div>

                <div className="form-fields">
                    <label className="text-white fw-medium">Privacy</label>
                    <div className="radio-buttons-container">
                        <RadioButton
                            id="private"
                            checked={isPrivate}
                            name="is_private"
                            value={true}
                            fnOnChange={() => setIsPrivate(true)}
                        />
                        <RadioButton
                            id="public"
                            checked={!isPrivate}
                            name="is_private"
                            value={false}
                            fnOnChange={() => setIsPrivate(false)}
                        />
                    </div>
                </div>

                {isPrivate && (
                    <div className="form-fields">
                        <label
                            htmlFor="password"
                            className="text-white fw-medium"
                        >
                            Password
                        </label>
                        <MainInput
                            type="password"
                            name="password"
                            placeholder="Enter a secure password"
                            register={register}
                            validation={{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must include uppercase, lowercase, a number, and a special character",
                                },
                            }}
                            error={errors.password?.message as string}
                        />
                    </div>
                )}

                <MainButton text="Update Room" type="submit" />
            </form>
        </div>
    );
};

export default UpdateRoom;
