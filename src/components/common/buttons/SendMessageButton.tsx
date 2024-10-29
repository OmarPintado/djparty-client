import { AiOutlineSend } from "react-icons/ai";

const SendMessageButton = ({}) => {
    return (
        <button
            type="submit"
            className="flex items-center w-8 h-8 justify-center rounded-sm text-white hover:bg-white/10  transition duration-200"
        >
            <AiOutlineSend className="text-xl text-center" />
        </button>
    );
};

export default SendMessageButton;
