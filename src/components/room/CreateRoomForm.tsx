import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import MainInput from "../common/inputs/MainInput";
import "./css/CreateRoomForm.css";
import MainButton from "../common/buttons/MainButton";

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
        name: "date",
        type: "date",
        placeholder: "Select a date",
        validation: {
            required: "Date is required",
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("Room Created:", data);
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
            <MainButton text="Create Room" type="submit" />
        </form>
    );
};

export default CreateRoomForm;
