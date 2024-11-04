import { Link } from "react-router-dom";
import "./css/MainButton.css";

type MainButtonProps = {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    link?: string;
};

const MainButton = ({ text, onClick, type = "button", link }: MainButtonProps) => {
    const buttonContent = <div className="button-content">{text}</div>;

    return (
        <>
            {link ? (
                <Link to={link} className="main-button-container">
                    {buttonContent}
                </Link>
            ) : (
                <button type={type} onClick={onClick} className="main-button-container">
                    {buttonContent}
                </button>
            )}
        </>
    );
};

export default MainButton;