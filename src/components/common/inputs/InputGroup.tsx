import { useState } from "react";
import PasswordToggleButton from "../buttons/PasswordToggleButton";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import "./css/InputGroup.css";

type InputGroupProps = {
    inputs: {
        id: string;
        name: string;
        placeholder: string;
        type?: string;
        validation?: object;
    }[];
    register: UseFormRegister<any>;
    errors: FieldErrors;
};

const InputGroup = ({
    inputs,
    register,
    errors,
}: InputGroupProps) => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean[]>(
        inputs.map((input) => (input.type === "password" ? false : true))
    );

    const togglePasswordVisibility = (index: number) => {
        const newVisibility = [...passwordVisibility];
        newVisibility[index] = !newVisibility[index];
        setPasswordVisibility(newVisibility);
    };

    return (
        <div className="input-group-container">
            {inputs.map((input, index) => (
                <div className="input-container" key={input.id}>
                    <input
                        id={input.id}
                        type={
                            input.type === "password"
                                ? passwordVisibility[index]
                                    ? "text"
                                    : "password"
                                : input.type || "text"
                        }
                        placeholder={input.placeholder}
                        {...register(input.name, input.validation)}
                        className={`input-field ${
                            index === 0 ? "rounded-top" : ""
                        } ${
                            errors[input.name]?.message
                                ? "input-field-error"
                                : ""
                        } ${
                            index === inputs.length - 1 ? "rounded-bottom" : ""
                        }`}
                    />
                    {errors[input.name] && (
                        <p className="error-message">
                            {(errors[input.name]?.message as string) || ""}
                        </p>
                    )}
                    {input.type === "password" && (
                        <PasswordToggleButton
                            isVisible={passwordVisibility[index]}
                            onToggle={() => togglePasswordVisibility(index)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default InputGroup;
