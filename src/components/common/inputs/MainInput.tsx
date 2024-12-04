import { UseFormRegister } from "react-hook-form";
import "./css/MainInput.css";

type MainInputProps = {
    type?: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<any>;
    validation?: object;
    className?: string;
    classError?: string;
    error?: string;
};

const MainInput = ({
    type = "text",
    placeholder = "",
    name,
    register,
    validation,
    className = "",
    classError = "",
    error,
}: MainInputProps) => {
    return (
        <div className={`transparent-input-container ${className}`}>
            <input
                style={{ colorScheme: "dark" }}
                type={type}
                placeholder={placeholder}
                className={`transparent-input ${error ? "input-error" : ""}`}
                {...register(name, validation)}
            />
            {error && <p className={`error-message ${classError}`}>{error}</p>}
        </div>
    );
};

export default MainInput;
