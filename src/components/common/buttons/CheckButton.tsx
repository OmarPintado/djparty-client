import { Link } from "react-router-dom";
import "./css/CheckButton.css"

type CheckButtonProps = {
    text: string;
    link: {
        text: string;
        url: string;
    };
};

const CheckButton = ({ text, link }: CheckButtonProps) => {
    return (
        <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
            <p className="checkbox-text">
                {text} <Link className="checkbox-link" to={link.url}>{link.text}</Link>
            </p>
        </div>
    );
};

export default CheckButton;
