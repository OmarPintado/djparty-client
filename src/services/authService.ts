import { isAxiosError } from "axios";
import { RegisterData ,LoginData} from "../types";
import { clientApi } from "./api.";

export const registerUser = async (userData: RegisterData) => {
    try{       
        const { data } = await clientApi.post<string>("/register", userData);
        return data;
    }catch(error){
        if(isAxiosError(error)&&error.response){
            throw new Error(error.response.data.error)
        }
    }
};
export async function authenticateUser(formData: LoginData) {
    try {
        const { data } = await clientApi.post<string>('/login', formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


