import "./css/RadioButton.css";
import { UseFormRegister } from "react-hook-form";

type RadioButtonProps = {
    id: string;
    name: string;
    checked: boolean;
    value: boolean;
    fnOnChange: () => void;
    register?: UseFormRegister<any>;
};

const RadioButton = ({
    id,
    name,
    value,
    fnOnChange,
    register,
    checked,
}: RadioButtonProps) => {
    return (
        <div
            className="radio-button-container cursor-pointer"
            onClick={() => fnOnChange()}
        >
            <div className={`radio-button-circle ${checked ? "checked" : ""}`}>
                <div className="radio-button-inner-circle">
                    <input
                        {...(register ? register(name) : {})}
                        type="radio"
                        id={id}
                        value={value.toString()}
                        name={name}
                        className={`radio-input ${checked ? "checked" : ""}`}
                    />
                </div>
            </div>
            <label htmlFor={id} className="radio-label text-white">
                {id}
            </label>
        </div>
    );
};

export default RadioButton;
