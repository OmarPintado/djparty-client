import { Link } from "react-router-dom";
import "./css/MainButton.css";

type MainButtonProps = {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    link?: string;
    className?: string;
};

const MainButton = ({
    text,
    onClick,
    type = "button",
    link,
    className,
}: MainButtonProps) => {
    const buttonContent = <div className="button-content">{text}</div>;

    return (
        <>
            {link ? (
                <Link
                    to={link}
                    className={`main-button-container ${className}`}
                >
                    {buttonContent}
                </Link>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    className={`main-button-container ${className}`}
                >
                    {buttonContent}
                </button>
            )}
        </>
    );
};

export default MainButton;
