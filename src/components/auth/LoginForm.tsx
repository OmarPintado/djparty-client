import { useForm } from "react-hook-form";
import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
import "./css/LoginForm.css";
import { useAuthenticationUser } from "../../hooks/useAuth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { dataInputsLogin } from "./formInputsConfig";
import { LoginData } from "../../types";

const LoginForm = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();
    const navigate = useNavigate();
    const { setToastMessage, login } = useContext(UserContext);
    const { mutate } = useAuthenticationUser();
    const onSubmit = (data: LoginData) => {
        mutate(data, {
            onSuccess: (user) => {
                reset();
                console.log(user)
                login({
                    id: user.id,
                    fullName: user.fullName || "Full Name Prueba",
                    email: user.email,
                    token:user.token
                });
                navigate("/");
            },
            onError: (error) => {
                setToastMessage(`Error de registro: ${error.message}`);
            },
        });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
                inputs={dataInputsLogin}
                register={register}
                errors={errors}
            />
            <MainButton text="Login" type="submit" />
        </form>
    );
};

export default LoginForm;
