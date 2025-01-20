import React from "react";
import styled from "styled-components";
import { Trash, Pencil } from "phosphor-react";
import toast from "react-hot-toast";
import { deleteTask } from "../api/apiTasks";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
}

interface TaskTableProps {
  tasks: Task[];
  onTaskDeleted: () => void;
  onEditTask: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onTaskDeleted, onEditTask }) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Tarefa deletada com sucesso!");
      onTaskDeleted(); // Recarregar a lista de tarefas
    } catch (error) {
      toast.error("Erro ao deletar tarefa.");
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Data de Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td className="description">{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td className="actions">
                <button
                  type="button"
                  onClick={() => onEditTask(task)}
                  className="edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task._id)}
                  className="delete"
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse; /* Remove os espaçamentos entre as bordas */
    margin-top: 1rem;

    th, td {
      padding: 0.75rem;
      text-align: left;
      border: 1px solid #ddd;
      vertical-align: top; /* Alinha o conteúdo no topo */
    }

    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }

    .description {
      max-width: 200px;
      word-wrap: break-word;
      white-space: normal; /* Permite a quebra de linha */
    }

    .actions {
      display: flex;
      gap: 0.5rem;

      .edit {
        color: #007bff;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
          color: #0056b3;
        }
      }

      .delete {
        color: #dc3545;
        background: none;
        border: none;
        cursor: pointer;

        &:hover {
          color: #a71d2a;
        }
      }
    }
  }
`;
