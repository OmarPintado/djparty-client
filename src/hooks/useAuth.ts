import { useMutation } from "@tanstack/react-query";
import * as AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";


export const useRegisterUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: AuthService.registerUser,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            navigate('/auth/login')
        }
    });
};

export const useAuthenticationUser = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
 
    return useMutation({
        mutationFn:AuthService.authenticateUser,
        onError: (error) =>{
            console.log("Error de autenticación:", error);
        },
        onSuccess: (data) => {
            if (data) {
                localStorage.setItem('user', JSON.stringify(data));  
                login(data);
                console.log("Usuario autenticado:", data);
                navigate('/');
            }
        }
    });
};