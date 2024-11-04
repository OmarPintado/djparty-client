import { LuEye, LuEyeOff } from "react-icons/lu";
import "./css/PasswordToggleButton.css";

interface PasswordToggleButtonProps {
    isVisible: boolean;
    onToggle: () => void;
}

const PasswordToggleButton = ({
    isVisible,
    onToggle,
}: PasswordToggleButtonProps) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="password-toggle-button"
        >
            {isVisible ? <LuEyeOff /> : <LuEye />}
        </button>
    );
};

export default PasswordToggleButton;
