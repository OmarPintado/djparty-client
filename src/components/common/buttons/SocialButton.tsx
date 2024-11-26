import { FaGoogle, FaFacebookF } from "react-icons/fa";
import "./css/SocialButton.css";

type SocialButtonProps = {
    provider: "google" | "facebook";
    onClick: () => void;
};

const SocialButton = ({ provider, onClick }: SocialButtonProps) => {
    const isGoogle = provider === "google";

    return (
        <button onClick={onClick} className="social-button">
            {isGoogle ? (
                <FaGoogle className="icon-margin" />
            ) : (
                <FaFacebookF className="icon-margin" />
            )}
        </button>
    );
};

export default SocialButton;
