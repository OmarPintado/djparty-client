import { useMutation } from "@tanstack/react-query";
import * as AuthService from "../services/authService";


export const useRegisterUser = () => {
    return useMutation({
        mutationFn:AuthService.registerUser,
        onError: (data) =>{
            console.log(data)
        },
        onSuccess: (data) =>{
            console.log(data)
        }
    });
};

export const useAuthenticationUser = () => {
    return useMutation({
        mutationFn:AuthService.authenticateUser,
        onError: (data) =>{
            console.log(data)
        },
        onSuccess: (data) =>{
            console.log(data)
        }
    });
};