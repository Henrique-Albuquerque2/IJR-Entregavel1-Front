import axios from "axios";
import { config } from "@/config/config";

const API_URL = `${config.apiBaseUrl}/tasks`;

export const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const API_URL = "http://127.0.0.1:8000/tasks";
  
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // A resposta é um objeto com tasks diretamente.
      const { tasks } = response.data;
  
      // tasks já é um array de objetos, não precisa de JSON.parse
      return tasks;
    } catch (error: any) {
      console.error("Erro ao buscar tarefas:", error.message);
      throw error;
    }
  };
  

export const createTask = async (task: any) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};


export const updateTask = async (id: string, task: any) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
}

export const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};