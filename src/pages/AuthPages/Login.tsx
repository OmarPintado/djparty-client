import LoginForm from "../../components/auth/LoginForm";
import "../css/LoginPage.css";
import Divider from "../../components/common/divider/Divider";
import AuthPrompt from "../../components/common/prompts/AuthPromp";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/common/buttons/GoogleAuthButton";
import { openGoogleAuthPopup, useGoogleAuth } from "../../hooks/useAuth";
import { Spinner } from "react-bootstrap";

const Login = () => {
    const {
        user: userDataContext,
        setToastProps,
        login,
    } = useContext(UserContext);

    const { mutate, isPending } = useGoogleAuth();
    const navigate = useNavigate();

    const openGoogleAuth = async () => {
        try {
            const { user } = await openGoogleAuthPopup();
            console.log("USEr LOGIN",user)
            if (user)
                mutate(user, {
                    onSuccess: (data) => {
                        login(data);
                        navigate("/");
                    },
                    onError: (error) => {
                        setToastProps({
                            message: `${error.message}`,
                            class: "error",
                        });
                    },
                });
        } catch (error) {
            console.error(error);
        }
    };

    if (userDataContext?.id) return <Navigate to="/" replace />;
    return (
        <div className="login-page">
            <h2 className="form-title">Login</h2>
            <p className="form-description">
                Enter your information below or login with a social media
                account
            </p>
            {!isPending ? (
                <>
                    <LoginForm />
                    <Divider />
                    <GoogleAuthButton
                        onClick={openGoogleAuth}
                        text="Login with Google"
                    />
                </>
            ) : (
                <div className="spinner">
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <AuthPrompt
                linkPath="/auth/signup"
                linkText="Sign up"
                text="Not have account?"
            />
        </div>
    );
};
export default Login;
