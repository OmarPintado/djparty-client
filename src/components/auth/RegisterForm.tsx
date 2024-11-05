import { useForm } from "react-hook-form";
import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
import "./css/RegisterForm.css";
import { RegisterData } from "../../types";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();

    const onSubmit = (data: RegisterData) => {
        console.log("Form Submitted", data);
    };

    const dataInputs = [
        {
            id: "1",
            name: "fullName",
            placeholder: "Enter your full name",
            type: "text",
            validation: {
                required: "Full Name is required",
                minLength: {
                    value: 8,
                    message: "Full name must be at least 8 characters",
                },
            },
        },
        {
            id: "2",
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
            id: "3",
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

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
                inputs={dataInputs}
                register={register}
                errors={errors}
            />
            <MainButton text="Register" type="submit" />
        </form>
    );
};

export default RegisterForm;
