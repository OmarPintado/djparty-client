import { RegisterDataGoogle } from './../types/index';
import { useMutation, useQuery } from "@tanstack/react-query";
import * as AuthService from "../services/authService";
import { GoogleAuthOptions, LoginData, RegisterData, User, UserData } from "../types";
import { useEffect } from "react";

export const useRegisterUser = () => {
    return useMutation<string, Error, RegisterData|RegisterDataGoogle >({
        mutationFn: AuthService.registerUser,
    });
};
export const useRegisterUserGoogle = (token: string) => {
    const { data, isError, isLoading } = useQuery<User, Error>({
        queryKey: ["auth", token],
        queryFn: () => AuthService.registerUserGoogle(token),
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isLoading };
};
export const useAuthenticationUser = () => {
    return useMutation<User, Error, LoginData>({
        mutationFn: AuthService.authenticateUser,
    });
};

export const useGoogleAuth = (
    onAuthSuccess: (userData: UserData) => void,
    options: GoogleAuthOptions = { width: 500, height: 600 }
) => {
    const { width, height } = options;

    const openGoogleAuth = () => {
        const googleAuthURL = `${import.meta.env.VITE_BASE_URL}/auth/google`;
        const left = window.innerWidth / 2 - (width || 500) / 2;
        const top = window.innerHeight / 2 - (height || 600) / 2;

        window.open(
            googleAuthURL,
            "GoogleAuth",
            `width=${width},height=${height},top=${top},left=${left}`
        );
    };

    useEffect(() => {
        const handleAuthMessage = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_BASE_URL) return;

            const userData = event.data as UserData;
            console.log("Datos recibidos:", userData);
            onAuthSuccess(userData); 
        };

        window.addEventListener("message", handleAuthMessage as EventListener);
        return () => {
            window.removeEventListener("message", handleAuthMessage as EventListener);
        };
    }, [import.meta.env.VITE_BASE_URL, onAuthSuccess]);

    return { openGoogleAuth };
};