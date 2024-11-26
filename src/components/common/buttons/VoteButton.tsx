import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import "./css/VoteButton.css";

type VoteButtonProps = {
    onClick: () => void;
};

const VoteButton = ({ onClick }: VoteButtonProps) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <button
            onClick={() => {
                onClick();
                setActive(!active);
            }}
            className={`vote-button ${active ? "active" : ""}`}
        >
            <FaThumbsUp />
        </button>
    );
};

export default VoteButton;