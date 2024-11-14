import { useEffect } from "react";
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";

interface GoogleAuthButtonProps {
    onLoginSuccess: (data: any) => void;
}

const GoogleAuthButton = ({ onLoginSuccess }: GoogleAuthButtonProps) => {
    const handleLogin = (response: GoogleCredentialResponse) => {
        if (response.credential) {
            fetch("/auth/google-redirect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: response.credential }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Datos del usuario:", data);
                    onLoginSuccess(data);
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión con Google", error);
                });
        }
    };

    useEffect(() => {}, []);

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log("Error de Google Login:")} // Acepta un error con tipo 'Error'
            />
        </div>
    );
};

export default GoogleAuthButton;
