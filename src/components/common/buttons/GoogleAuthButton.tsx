import "./css/GoogleButton.css";
import { FcGoogle } from "react-icons/fc";

type GoogleAuthButtonProps = {
    text: string;
    onClick: () => void;
};

const GoogleAuthButton = ({ text, onClick }: GoogleAuthButtonProps) => {
    return (
        <button className="google-button" onClick={() => onClick()}>
            <FcGoogle className="fs-3" />
            <span className="">{text}</span>
        </button>
    );
};

export default GoogleAuthButton;
