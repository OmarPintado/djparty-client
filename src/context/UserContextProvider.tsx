import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types";

export interface UserContextType {
    user: User | undefined;
    login: (data: User) => void;
    logOut: () => void;
    toastMessage: string;
    showToast: boolean;
    setToastMessage: (value: string) => void;
    setShowToast: (value: boolean) => void;
    toastTitle: string;
    setToastTitle: (value: string) => void;
}

const initialState: UserContextType = {
    user: JSON.parse(localStorage.getItem("user") || "null") || undefined,
    login: () => null,
    logOut: () => null,
    toastMessage: "",
    showToast: false,
    setToastMessage: () => null,
    setShowToast: () => null,
    toastTitle: "",
    setToastTitle: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [toastMessage, setToastMessage] = useState<string>("");
    const [toastTitle, setToastTitle] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(
        JSON.parse(localStorage.getItem("user") || "null") || undefined
    );
    const login = async (data: User) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("AUTH_TOKEN", data.token);
    };
    useEffect(() => {
        if (toastMessage != "") {
            setShowToast(true);
        }
    }, [toastMessage]);
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("AUTH_TOKEN");
        setUser(undefined);
    };
    const state = {
        user,
        logOut,
        login,
        toastMessage,
        showToast,
        setToastMessage,
        setShowToast,
        toastTitle,
        setToastTitle,
    };

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
