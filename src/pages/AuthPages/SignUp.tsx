import { useContext } from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import "../css/SignUpPage.css";
import Divider from "../../components/common/divider/Divider";
import AuthPrompt from "../../components/common/prompts/AuthPromp";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/common/buttons/GoogleAuthButton";
import { openGoogleAuthPopup, useGoogleAuth } from "../../hooks/useAuth";
import { Spinner } from "react-bootstrap";

const SignUp = () => {
    const {
        user: userDataContext,
        setToastProps,
        login,
    } = useContext(UserContext);

    const { mutate, isPending } = useGoogleAuth();
    const navigate = useNavigate();

    const openGoogleAuth = async () => {
        try {
            const { user:userGoogle } = await openGoogleAuthPopup();
            if (userGoogle)
                mutate(userGoogle, {
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
        }
    };

    if (userDataContext?.id) return <Navigate to="/" replace />;
    return (
        <div className="signup-page">
            <h2 className="form-title">Register</h2>
            <p className="form-description">
                Enter your information below or register with a social media
                account
            </p>
            {!isPending ? (
                <>
                    <RegisterForm />
                    <Divider />
                    <GoogleAuthButton
                        onClick={openGoogleAuth}
                        text="Register with Google"
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
                linkPath="/auth/login"
                linkText="Login"
                text="Already have an account?"
            />
        </div>
    );
};

export default SignUp;
