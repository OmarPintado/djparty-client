import { Link } from "react-router-dom";
import './css/AuthPrompt.css'
type AuthPromptProps = {
    text: string;
    linkText: string;
    linkPath: string;
};

const AuthPrompt = ({ text, linkText, linkPath }: AuthPromptProps) => {
    return (
        <p className="signup-text">
            {text}{" "}
            <Link to={linkPath} className="signup-link">
                {linkText}
            </Link>
        </p>
    );
};

export default AuthPrompt;
