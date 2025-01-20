import axios from "axios";
import { config } from "../../../config/config"; // Importa a configuração com a URL base

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/login`, {
      email,
      password,
    });
    const { access_token, user_name } = response.data;
    
    // Salvar o token e o nome do usuário no localStorage
    localStorage.setItem("token", access_token);
    localStorage.setItem("userName", user_name);

    return response.data; // Retorna os dados do usuário e o token
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Erro ao realizar login");
  }
};

