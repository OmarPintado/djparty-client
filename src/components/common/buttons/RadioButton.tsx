import React from "react";

type RadioButtonProps = {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = ({
    id,
    name,
    value,
    checked,
    label,
    onChange,
}: RadioButtonProps) => {
    return (
        <div className="flex items-center justify-center mb-2  ">
            <div
                className={`rounded-full flex items-center justify-center h-5 w-5 p-0.5 ${
                    checked ? "bg-primary-gradient" : "bg-white/10"
                }`}
            >
                <div
                    className={`flex items-center justify-between bg-black  w-full h-full rounded-full `}
                >
                    <input
                        type="radio"
                        id={id}
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className={`appearance-none mx-auto w-2.5 h-2.5 ${
                            checked ? "bg-blue-600" : "bg-transparent"
                        } rounded-full cursor-pointer`}
                    />
                </div>
            </div>
            <label htmlFor={id} className="ml-2 select-none text-sm cursor-pointer">
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
