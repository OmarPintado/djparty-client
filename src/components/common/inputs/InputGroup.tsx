import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import PasswordToggleButton from "../buttons/PasswordToggleButton";

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
        <div className="flex flex-col gap-2 w-full max-w-80">
            {inputs.map((input, index) => (
                <div className="relative" key={input.id}>
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
                        className={`border outline-none w-full bg-transparent p-4 text-sm text-white placeholder-gray-custom-500 border-gray-custom-500 ${
                            index === 0 ? "rounded-t-3xl" : ""
                        } ${index === inputs.length - 1 ? "rounded-b-3xl" : ""}`}
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
