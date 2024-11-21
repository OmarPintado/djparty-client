import { GoogleAuthResponse, GoogleUser } from './../types/index';
import { useMutation } from "@tanstack/react-query";
import * as AuthService from "../services/authService";
import {  LoginData, RegisterData, User } from "../types";

export const useRegisterUser = () => {
    return useMutation<string, Error, RegisterData>({
        mutationFn: AuthService.registerUser,
    });
};
export const useAuthenticationUser = () => {
    return useMutation<User, Error, LoginData>({
        mutationFn: AuthService.authenticateUser,
    });
};
export const useGoogleAuth = () =>{
    return useMutation<User, Error, GoogleUser>({
        mutationFn: AuthService.googleAuth,
    });
}
export const openGoogleAuthPopup = async(): Promise<GoogleAuthResponse>  => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - (width || 500) / 2;
    const top = window.innerHeight / 2 - (height || 600) / 2;
    window.open(
        `${import.meta.env.VITE_BASE_URL}/auth/google`, 
        "Google Auth",
       `width=${width},height=${height},top=${top},left=${left}`
    );
    const data:GoogleAuthResponse  = await new Promise((resolve) => {
        const receiveMessage = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_BASE_URL) {
                console.warn("Origen no confiable:", event.origin);
                return;
            }
            resolve(event.data);
            window.removeEventListener("message", receiveMessage);
        };
        window.addEventListener("message", receiveMessage, false);
    });
    return data;
};