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

const RegisterForm = () => {
    const { setToastMessage } = useContext(UserContext);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();
    const { mutate } = useRegisterUser();
    const navigate = useNavigate();
    const onSubmit = (data: RegisterData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                navigate('/auth/login')
                setToastMessage("Usuario registrado exitosamente");
            },
            onError: (error) => {
                setToastMessage(`Error de registro: ${error.message}`);
            },
        });
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
                inputs={dataInputsRegister}
                register={register}
                errors={errors}
            />
            <MainButton text="Register" type="submit" />
        </form>
    );
};

export default RegisterForm;
