import { useForm } from "react-hook-form";
import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
import "./css/LoginForm.css";
import { authenticateUser, registerUser } from "../../services/authService";
import { useAuthenticationUser, useRegisterUser } from "../../hooks/useAuth";

type FormData = {
    email: string;
    password: string;
};

const dataInputs = [
    {
        id: "1",
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
            },
        },
    },
    {
        id: "2",
        name: "password",
        placeholder: "Enter your password",
        type: "password",
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        },
    },
];

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const { mutate } = useAuthenticationUser();
    const onSubmit = (data: FormData) => {
        mutate(data);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
                inputs={dataInputs}
                register={register}
                errors={errors}
            />
            <MainButton text="Login" type="submit" />
        </form>
    );
};

export default LoginForm;
