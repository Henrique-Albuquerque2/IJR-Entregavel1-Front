import axios from "axios";
import { config } from "@/config/config";

export const fetchTaskSummary = async (token: string) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/tasks/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar resumo das tarefas:", error);
    throw error;
  }
};
