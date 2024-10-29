import { FaEllipsisH } from "react-icons/fa";
type MusicOptionsButtonProps = {
    toggleOptions: () => void;
};

const MusicOptionsButton = ({ toggleOptions }: MusicOptionsButtonProps) => {
    return (
        <button
            onClick={toggleOptions}
            className="flex items-center w-8 h-8 justify-center   rounded-sm  text-white font-semibold  hover:bg-white/10 active:bg-gray-800 transition-all duration-500"
        >
            <FaEllipsisH className="w-5 h-5" />
        </button>
    );
};

export default MusicOptionsButton;
