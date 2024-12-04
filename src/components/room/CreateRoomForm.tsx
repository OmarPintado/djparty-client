import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import MainInput from "../common/inputs/MainInput";
import "./css/CreateRoomForm.css";
import MainButton from "../common/buttons/MainButton";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { createMusicRoom } from "../../services/roomServices";
import { useNavigate } from "react-router-dom";
import RadioButton from "../common/buttons/RadioButton";
import { isAxiosError } from "axios";
import { Spinner } from "react-bootstrap";

type InputConfig = {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    validation: object;
};

const inputConfigs: InputConfig[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter room name",
        validation: {
            required: "Room name is required",
            minLength: {
                value: 3,
                message: "Room name must be at least 3 characters",
            },
        },
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Enter room description",
        validation: {
            required: "Description is required",
            maxLength: {
                value: 50,
                message: "Description cannot exceed 50 characters",
            },
        },
    },
    {
        name: "file",
        label: "Imagen",
        type: "file",
        placeholder: "Enter an image",
        validation: {
            required: "Image is required",
            validate: (value: FileList | null) => {
                if (!value || value.length === 0) {
                    return "An image file is required.";
                }
                const fileType = value[0]?.type;
                if (
                    fileType &&
                    !["image/jpeg", "image/png", "image/gif"].includes(fileType)
                ) {
                    return "Only image files (jpg, png, gif) are allowed.";
                }
                const fileSize = value[0]?.size;
                if (fileSize && fileSize > 4000000) {
                    return "Image size should not exceed 4MB.";
                }

                return true;
            },
        },
    },
    {
        label: "Start Date",
        name: "start_date",
        type: "date",
        placeholder: "Enter start date room",
        validation: {
            required: "Start date is required",
            validate: (value: string) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                if (selectedDate < currentDate) {
                    return "Start date cannot be in the past";
                }
                return true;
            },
        },
    },
];

const CreateRoomForm = () => {
    const [isPrivate, setIsPrivate] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const { user, setToastProps } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user || !user.id) {
            return;
        }

        setIsLoading(true); 

        const startDateFormat = new Date(data.start_date)
            .toISOString()
            .split("T")[0];

        const formData = new FormData();
        formData.append("created_by", user.id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("start_date", startDateFormat);
        formData.append("is_private", isPrivate.toString());
        if (data.file[0]) {
            formData.append("file", data.file[0]); 
        }
        if (isPrivate && data.password) {
            formData.append("password", data.password);
        }

        try {
            const room = await createMusicRoom(formData); 
            setIsLoading(false); 
            navigate(`/room-home/${room.id}`);
        } catch (error) {
            setIsLoading(false);
            if (isAxiosError(error) && error.response) {
                setToastProps({
                    message: error.response.data.message,
                    class: "error",
                });
            } else {
                setToastProps({
                    message: "An unknown error occurred",
                    class: "error",
                });
            }
        }
    };

    return (
        <form className="create-room-form" onSubmit={handleSubmit(onSubmit)}>
            {inputConfigs.map((inputConfig) => (
                <div className="form-fields" key={inputConfig.name}>
                    <label
                        className="text-white fw-semibold"
                        htmlFor={inputConfig.name}
                    >
                        {inputConfig.label}
                    </label>
                    <MainInput
                        type={inputConfig.type}
                        placeholder={inputConfig.placeholder}
                        name={inputConfig.name}
                        register={register}
                        classError={
                            inputConfig.type === "file" ? " mt-2 " : " "
                        }
                        validation={inputConfig.validation}
                        error={errors[inputConfig.name]?.message as string}
                    />
                </div>
            ))}

            <div className="form-fields">
                <label
                    className="text-white fw-semibold"
                    htmlFor={"is_private"}
                >
                    Privacy
                </label>
                <div className="radio-buttons-container">
                    <RadioButton
                        id="private"
                        checked={isPrivate === true}
                        name="is_private"
                        value={true}
                        fnOnChange={() => setIsPrivate(true)}
                        register={register}
                    />
                    <RadioButton
                        id="public"
                        checked={isPrivate === false}
                        name="is_private"
                        value={false}
                        fnOnChange={() => setIsPrivate(false)}
                        register={register}
                    />
                </div>
            </div>

            {isPrivate && (
                <div className="form-fields">
                    <label
                        className="text-white fw-semibold"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <MainInput
                        type="password"
                        placeholder="Enter a secure password"
                        name="password"
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

            <MainButton text="Create Room" type="submit" />

            {isLoading && (
                <div className="spinner-container">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </form>
    );
};

export default CreateRoomForm;
