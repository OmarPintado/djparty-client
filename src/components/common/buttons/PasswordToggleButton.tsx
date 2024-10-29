import { LuEye, LuEyeOff } from "react-icons/lu";

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
            className="absolute inset-y-0 right-0 text-2xl outline-none focus:text-white flex items-center pr-4 text-gray-custom-500"
        >
            {isVisible ? <LuEyeOff /> : <LuEye />}
        </button>
    );
};

export default PasswordToggleButton;
