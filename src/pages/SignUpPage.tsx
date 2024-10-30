import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import "./css/SignUpPage.css";

const SignUpPage = () => {
    return (
        <div className="signup-page">
            <h2>Register</h2>
            <p>
                Enter your information below or register with a social media
                account
            </p>
            <RegisterForm />

            <p className="signup-text">
                Already have an account?{" "}
                <Link to="/login" className="signup-link">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;