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
import { Spinner } from "react-bootstrap";

const LoginForm = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();
    const navigate = useNavigate();
    const { setToastProps, login } = useContext(UserContext);
    const { mutate, isPending } = useAuthenticationUser();
    const onSubmit = (data: LoginData) => {
        mutate(data, {
            onSuccess: (user) => {
                reset();
                login({
                    id: user.id,
                    fullName: user.fullName || "Full Name Prueba",
                    email: user.email,
                    token: user.token,
                });
                navigate("/");
            },
            onError: (error) => {
                setToastProps({
                    message: ` ${error.message}`,
                    class: "error",
                });
            },
        });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {!isPending ? (
                <>
                    <InputGroup
                        inputs={dataInputsLogin}
                        register={register}
                        errors={errors}
                    />
                    <MainButton text="Login" type="submit" />
                </>
            ) : (
                <div className="spinner">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
