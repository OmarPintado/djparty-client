import { useState } from "react";
import PasswordToggleButton from "../buttons/PasswordToggleButton";
import "./css/InputGroup.css";

type InputGroupProps = {
    inputs: {
        id: string;
        placeholder: string;
        type?: string;
    }[];
    values: string[];
    onChange: (index: number, value: string) => void;
};

const InputGroup = ({ inputs, values, onChange }: InputGroupProps) => {
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
                        value={values[index]}
                        onChange={(e) => onChange(index, e.target.value)}
                        className={`input-field ${
                            index === 0 ? "rounded-top" : ""
                        } ${
                            index === inputs.length - 1 ? "rounded-bottom" : ""
                        }`}
                    />
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
