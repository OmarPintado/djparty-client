import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SocialButton from "../components/common/buttons/SocialButton";
import "./css/LoginPage.css";

export const LoginPage = () => {
    return (
        <div className="login-page">
            <h2>LoginPage</h2>
            <LoginForm />
            <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">Or</span>
                <div className="divider-line"></div>
            </div>
            <div className="social-buttons">
                <SocialButton
                    provider="facebook"
                    onClick={() => console.log("login facebook")}
                />
                <SocialButton
                    provider="google"
                    onClick={() => console.log("login google")}
                />
            </div>
            <p className="signup-text">
                Not have account?{" "}
                <Link to="/signup" className="signup-link">
                    Sign up
                </Link>
            </p>
        </div>
    );
};
