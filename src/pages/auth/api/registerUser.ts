import axios from "axios";
import { config } from "../../../config/config";

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/create-user`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Erro ao registrar usuário");
  }
};
