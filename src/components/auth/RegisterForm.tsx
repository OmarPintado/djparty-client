import { useForm } from "react-hook-form";
import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
import "./css/RegisterForm.css";
import { RegisterData } from "../../types";
import { useRegisterUser } from "../../hooks/useAuth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { dataInputsRegister } from "./formInputsConfig";
import { Spinner } from "react-bootstrap";

const RegisterForm = () => {
    const { setToastProps } = useContext(UserContext);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();
    const { mutate, isPending } = useRegisterUser();
    const navigate = useNavigate();

    const onSubmit = (data: RegisterData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                navigate("/auth/login");
                setToastProps({
                    message: "Usuario registrado exitosamente",
                    class: "success",
                });
            },
            onError: (error) => {
                setToastProps({
                    message: `Error de registro: ${error.message}`,
                    class: "error",
                });
            },
        });
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {!isPending ? (
                <>
                    <InputGroup
                        inputs={dataInputsRegister}
                        register={register}
                        errors={errors}
                    />
                    <MainButton text="Register" type="submit" />
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

export default RegisterForm;
