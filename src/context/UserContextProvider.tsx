import { createContext, ReactNode, useEffect, useState } from "react";
import { ToastPropsType, User } from "../types";
import { RoomPreview } from "../components/room/RoomListRow";

export interface UserContextType {
    user: User | undefined;
    setUser: (data: User) => void;
    login: (data: User) => void;
    logOut: () => void;
    toastProps: ToastPropsType;
    showToast: boolean;
    roomPreview: RoomPreview | null;
    setToastProps: (data: ToastPropsType) => void;
    setRoomPreview: (room: RoomPreview | null) => void;
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
    roomPreview: null,
    setRoomPreview: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [toastProps, setToastProps] = useState<ToastPropsType>({
        message: "",
        class: "",
    });
    const [roomPreview, setRoomPreview] = useState<RoomPreview | null>(null);
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
        } else {
            setShowToast(false);
        }
    }, [toastProps.message]);
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("AUTH_TOKEN");
        setUser(undefined);
    };
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("AUTH_TOKEN", user.token);
        }
    }, [user]);
    const state = {
        user,
        login,
        logOut,
        setUser,
        showToast,
        toastProps,
        roomPreview,
        setToastProps,
        setRoomPreview,
    };

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
