import axios from "axios";
import { config } from "../../../config/config"; // Importa a configuração com a URL base

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/login`, {
      email,
      password,
    });
    return response.data; // Retorna os dados do usuário e o token
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Erro ao realizar login");
  }
};