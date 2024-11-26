import { AiOutlineSend } from "react-icons/ai";
import "./css/SendMessageButton.css";

const SendMessageButton = () => {
    return (
        <button type="submit" className="send-message-button">
            <AiOutlineSend className="send-message-icon" />
        </button>
    );
};

export default SendMessageButton;