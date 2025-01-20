import React, { useState } from "react";
import styled from "styled-components";
import EditTaskModal from "./EditTaskModal";
import { deleteTask } from "../api/apiTasks";
import { Trash, Pencil } from "phosphor-react";

// Task interface
interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pendente" | "emProgresso" | "finalizada";
  priority: "baixa" | "média" | "alta";
  due_date: string;
  owner: string;
}

interface TaskTableProps {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, fetchTasks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <TableWrapper>
      <ScrollContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Prioridade</th>
              <th>Data do Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.due_date).toLocaleDateString()}</td>
                <td>
                  <ActionContainer>
                    <ActionButton
                      color="#007bff"
                      onClick={() => openEditModal(task)}
                      title="Editar Tarefa"
                    >
                      <Pencil size={20} />
                    </ActionButton>
                    <ActionButton
                      color="#dc3545"
                      onClick={() => handleDelete(task._id)}
                      title="Deletar Tarefa"
                    >
                      <Trash size={20} />
                    </ActionButton>
                  </ActionContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </ScrollContainer>

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          closeModal={closeEditModal}
          fetchTasks={fetchTasks}
        />
      )}
    </TableWrapper>
  );
};

export default TaskTable;

/* Styled Components */
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ color?: string }>`
  background: none;
  border: none;
  color: ${(props) => props.color || "#007bff"};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export { TaskTable };