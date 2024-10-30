import React from "react";
import "./css/RadioButton.css";

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
        <div className="radio-button-container">
            <div className={`radio-button-circle ${checked ? "checked" : ""}`}>
                <div className="radio-button-inner-circle">
                    <input
                        type="radio"
                        id={id}
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className={`radio-input ${checked ? "checked" : ""}`}
                    />
                </div>
            </div>
            <label htmlFor={id} className="radio-label">
                {label}
            </label>
        </div>
    );
};

export default RadioButton;
