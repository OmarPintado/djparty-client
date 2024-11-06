import { createContext, ReactNode, useState } from "react";
import { User } from "../types";

export interface UserContextType {
    user: User | undefined;
    login: (data: User) => void;
    logOut: () => void;
}

const initialState: UserContextType = {
    user: JSON.parse(localStorage.getItem("user") || "null") || undefined,
    login: () => null,
    logOut: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(
        JSON.parse(localStorage.getItem("user") || "null") || undefined
    );
    const login = async (data: User) => {
        setUser(data);
    };

    const logOut = () => {
        localStorage.removeItem("user");
        setUser(undefined);
    };
    const state = {
        user,
        logOut,
        login,
    };

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
