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
        label: "Start Date",
        name: "start_date",
        type: "date",
        placeholder: "Enter start date room",
        validation: {
            required: "Start date is required",
            validate: (value: string) => {
                const [year, month, day] = value.split("-").map(Number);
                const selectedDate = new Date(year, month - 1, day);
                //const selectedDate = new Date(value);
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            is_private: isPrivate,
        },
    });
    const { user, setToastProps } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user || !user.id) {
            console.error("User is not logged in");
            return;
        }
        const startDate = new Date(data.start_date);
        if (isNaN(startDate.getTime())) {
            console.error("Invalid date provided");
            return;
        }

        const startDateFormat = new Date(data.start_date)
            .toISOString()
            .split("T")[0];

        const roomData = {
            created_by: user.id,
            name: data.name,
            description: data.description,
            start_date: startDateFormat,
            is_private: isPrivate,
            password: data.password,
        };
        console.log(roomData);
        try {
            const room = await createMusicRoom(roomData);
            console.log("Room Created:", room);
            navigate(`/room-home/${room.id}`);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.error("Failed to create room:", error);
            }
            setToastProps({
                message: `${error}`,
                class: "error",
            });
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
        </form>
    );
};

export default CreateRoomForm;
