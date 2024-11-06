import RegisterForm from "../components/auth/RegisterForm";
import "./css/SignUpPage.css";
import Divider from "../components/common/divider/Divider";
import SocialButtonGroup from "../components/common/buttons/SocialButtonGroup";
import AuthPrompt from "../components/common/prompts/AuthPromp";

const SignUpPage = () => {
    return (
        <div className="signup-page">
            <h2>Register</h2>
            <p>
                Enter your information below or register with a social media
                account
            </p>
            <RegisterForm />
            <Divider />
            <SocialButtonGroup />
            <AuthPrompt
                linkPath="/auth/login"
                linkText="Login"
                text="Already have an account?"
            />
        </div>
    );
};

export default SignUpPage;
