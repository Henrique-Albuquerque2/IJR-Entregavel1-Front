import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TaskTable } from "./components/TaskTable";
import { TaskModal } from "./components/TaskModal";
import TaskFilter from "./components/TaskFilter";
import { fetchTasks } from "./api/apiTasks";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  _id: string;
  description: string;
  due_date: string;
  owner: string;
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const getTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks); // Inicialmente exibe todas as tarefas
    } catch (error) {
      toast.error("Erro ao carregar as tarefas. Tente novamente.");
    }
  };

  const handleFilterChange = (newFilters: { status: string; priority: string }) => {
    setFilters(newFilters);
    const filtered = tasks.filter((task) => {
      const matchesStatus = newFilters.status
        ? task.status === newFilters.status
        : true;
      const matchesPriority = newFilters.priority
        ? task.priority === newFilters.priority
        : true;

      return matchesStatus && matchesPriority;
    });

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksWrapper>
      <div className="header">
        <h1>Gerenciamento de Tarefas</h1>
        <button
          className="add-task-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Adicionar Tarefa
        </button>
      </div>
      <TaskFilter onFilterChange={handleFilterChange} />
      <TaskTable tasks={filteredTasks} fetchTasks={getTasks} />
      {isModalOpen && (
        <TaskModal
          closeModal={() => setIsModalOpen(false)}
          fetchTasks={getTasks}
        />
      )}
    </TasksWrapper>
  );
};

const TasksWrapper = styled.div`
  padding: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 1.5rem;
      color: #333;
    }

    .add-task-btn {
      background-color: #28a745;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #218838;
      }
    }
  }
`;
