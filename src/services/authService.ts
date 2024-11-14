import { isAxiosError } from "axios";
import { RegisterData ,LoginData, User, RegisterDataGoogle} from "../types";
import { clientApi } from "./api.";

export const registerUser = async (userData: RegisterData|RegisterDataGoogle): Promise<string> => {
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
export const registerUserGoogle = async (token: string): Promise<User> => {
    try {
      const { data } = await clientApi.post<User>("/auth/google-redirect", { token });
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
        throw new Error(error.response.data.error);
    }
    throw new Error("Error desconocido");
    }
};


