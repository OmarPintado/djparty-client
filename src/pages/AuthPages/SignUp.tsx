import { useContext } from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import "../css/SignUpPage.css";
import Divider from "../../components/common/divider/Divider";
import AuthPrompt from "../../components/common/prompts/AuthPromp";
import { useGoogleAuth, useRegisterUser } from "../../hooks/useAuth";
import { RegisterDataGoogle, UserData } from "../../types";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const { mutate } = useRegisterUser();
    const { setToastMessage, setShowToast } = useContext(UserContext);

    const handleAuthSuccess = (userData: UserData) => {
        const { user } = userData;
        console.log("Datos del usuario:", userData);
        const register: RegisterDataGoogle = {
            email: user.email,
            fullName: user.firstName + " " + user.lastName,
        };
        mutate(register, {
            onSuccess: () => {
                setToastMessage("Usuario registrado exitosamente");
                setShowToast(true);
            },
            onError: (error) => {
                setToastMessage(`Error de registro: ${error.message}`);
                setShowToast(true);
            },
        });
    };

    const { openGoogleAuth } = useGoogleAuth(handleAuthSuccess);
    const { user } = useContext(UserContext);
    if (user?.id) return <Navigate to="/" replace />;
    return (
        <div className="signup-page">
            <h2 className="form-title">Register</h2>
            <p className="form-description">
                Enter your information below or register with a social media
                account
            </p>
            <RegisterForm />
            <Divider />
            <button onClick={openGoogleAuth}>Register with Google</button>

            <AuthPrompt
                linkPath="/auth/login"
                linkText="Login"
                text="Already have an account?"
            />
        </div>
    );
};

export default SignUp;
