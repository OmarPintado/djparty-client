import { FaEllipsisH } from "react-icons/fa";
import "./css/MusicOptionsButton.css";

type MusicOptionsButtonProps = {
    toggleOptions: () => void;
};

const MusicOptionsButton = ({ toggleOptions }: MusicOptionsButtonProps) => {
    return (
        <button onClick={toggleOptions} className="music-options-button">
            <FaEllipsisH className="icon-size" />
        </button>
    );
};

export default MusicOptionsButton;