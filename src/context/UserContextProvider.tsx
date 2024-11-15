import { createContext, ReactNode, useEffect, useState } from "react";
import { ToastPropsType, User } from "../types";

export interface UserContextType {
    user: User | undefined;
    setUser: (data: User) => void;
    login: (data: User) => void;
    logOut: () => void;
    toastProps: ToastPropsType;
    showToast: boolean;
    setToastProps: (data: ToastPropsType) => void;
    setShowToast: (value: boolean) => void;
}

const initialState: UserContextType = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    login: () => null,
    setUser: () => null,
    logOut: () => null,
    toastProps: {
        message: "",
        class: "",
    },
    showToast: false,
    setToastProps: () => null,
    setShowToast: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [toastProps, setToastProps] = useState<ToastPropsType>({
        message: "",
        class: "",
    });
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
        if (toastProps.message != "") {
            setShowToast(true);
            setTimeout(() => {
                setToastProps({
                    message: "",
                    class: "",
                });
            }, 3510);
        }
    }, [toastProps.message]);
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("AUTH_TOKEN");
        setUser(undefined);
    };
    const state = {
        user,
        logOut,
        setUser,
        login,
        toastProps,
        showToast,
        setToastProps,
        setShowToast,
    };

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
