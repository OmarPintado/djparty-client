import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import MainInput from "../common/inputs/MainInput";
import "./css/CreateRoomForm.css";
import MainButton from "../common/buttons/MainButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { createMusicRoom } from "../../services/roomServices";
import { useNavigate } from "react-router-dom";

type InputConfig = {
    name: string;
    type: string;
    placeholder: string;
    validation: object;
};

const inputConfigs: InputConfig[] = [
    {
        name: "name",
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
];

const CreateRoomForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!user || !user.id) {
            console.error("User is not logged in");
            return;
        }

        const roomData = {
            created_by: user.id,
            name: data.name,
            description: data.description,
        };

        try {
            const room = await createMusicRoom(roomData);
            console.log("Room Created:", room);
            navigate(`/room-home/${room.id}`);
        } catch (error) {
            console.error("Failed to create room:", error);
        }
    };

    return (
        <form className="create-room-form" onSubmit={handleSubmit(onSubmit)}>
            {inputConfigs.map((inputConfig) => (
                <MainInput
                    key={inputConfig.name}
                    type={inputConfig.type}
                    placeholder={inputConfig.placeholder}
                    name={inputConfig.name}
                    register={register}
                    validation={inputConfig.validation}
                    error={errors[inputConfig.name]?.message as string}
                />
            ))}
            <MainButton text="Create Room"  type="submit" />
        </form>
    );
};

export default CreateRoomForm;
