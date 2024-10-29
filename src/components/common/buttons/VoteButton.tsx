import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
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
            className={`flex items-center text-xl w-8 h-8 justify-center  hover:bg-white/10 ${
                active ? "text-white" : "text-white/40"
            }   rounded-sm hover:text-white/40 active:text-white transition duration-500`}
        >
            <FaThumbsUp className="text-xl" />
        </button>
    );
};

export default VoteButton;
