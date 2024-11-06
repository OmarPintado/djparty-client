import LoginForm from "../components/auth/LoginForm";
import "./css/LoginPage.css";
import Divider from "../components/common/divider/Divider";
import SocialButtonGroup from "../components/common/buttons/SocialButtonGroup";
import AuthPrompt from "../components/common/prompts/AuthPromp";

export const LoginPage = () => {
    return (
        <div className="login-page">
            <h2>Login</h2>
            <p>
                Enter your information below or login with a social media
                account
            </p>
            <LoginForm />
            <Divider />
            <SocialButtonGroup />
            <AuthPrompt
                linkPath="/auth/signup"
                linkText="Sign up"
                text="Not have account?"
            />
        </div>
    );
};
