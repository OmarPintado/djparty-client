import LoginForm from "../../components/auth/LoginForm";
import "../css/LoginPage.css";
import Divider from "../../components/common/divider/Divider";
import AuthPrompt from "../../components/common/prompts/AuthPromp";
import { clientApi } from "../../services/api.";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
    const handleClick = async () => {
        console.log("google backend inicio");
        try {
            const { data } = await clientApi.get("/auth/google");
            console.log("DATA " + data);
            console.log("google backend fin");
        } catch (error) {
            console.log("error: ", error);
        }
    };
    const { user } = useContext(UserContext);
    if (user?.id) return <Navigate to="/" replace />;
    return (
        <div className="login-page">
            <h2 className="form-title">Login</h2>
            <p className="form-description">
                Enter your information below or login with a social media
                account
            </p>
            <LoginForm />
            <Divider />
            <button onClick={() => handleClick()}>Register with gogole</button>

            <AuthPrompt
                linkPath="/auth/signup"
                linkText="Sign up"
                text="Not have account?"
            />
        </div>
    );
};
export default Login