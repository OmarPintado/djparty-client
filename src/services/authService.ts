import { isAxiosError } from "axios";
import { RegisterData ,LoginData, User, GoogleUser} from "../types";
import { clientApi } from "./api.";

export const registerUser = async (userData: RegisterData): Promise<string> => {
  try {
    const { data } = await clientApi.post<string>("/auth/register", userData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error desconocido");
  }
};
export const authenticateUser = async (formData: LoginData): Promise<User> => {
    try {
        const { data } = await clientApi.post<User>("/auth/login", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido");
    }
};
export const googleAuth = async(googleData:GoogleUser) : Promise<User>=>{
    try {
        const { data } = await clientApi.post<User>("/auth/google-auth", {
            email: googleData.email,
            fullName: googleData.firstName + " " + googleData.lastName,
            url_profile:googleData.picture
        });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido");
    }
}

