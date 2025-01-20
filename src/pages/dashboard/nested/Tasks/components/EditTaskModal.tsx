import React, { useState } from "react";
import { updateTask } from "../api/apiTasks";
import styled from "styled-components";

// Define a Task type locally
interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pendente" | "emProgresso" | "finalizada";
  priority: "baixa" | "média" | "alta";
  due_date: string;
  owner: string;
}

interface EditTaskModalProps {
  task: Task;
  closeModal: () => void;
  fetchTasks: () => Promise<void>;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, closeModal, fetchTasks }) => {
  const [formData, setFormData] = useState<Task>({
    ...task,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Task) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTask(formData._id, formData);
      await fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Editar Tarefa</h2>
        <form onSubmit={handleSubmit}>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label>Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pendente">Pendente</option>
            <option value="emProgresso">Em Progresso</option>
            <option value="finalizada">Finalizada</option>
          </select>
          <label>Prioridade</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
          <label>Data do Fim</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date.substring(0, 10)}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditTaskModal;

/* Styled Components */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 0.9rem;
      color: #666;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
      }
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;

      button {
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:first-child {
          background-color: #007bff;
          color: white;
        }

        &:last-child {
          background-color: #ddd;
          color: #333;
        }

        &:hover:first-child {
          background-color: #0056b3;
        }

        &:hover:last-child {
          background-color: #bbb;
        }
      }
    }
  }
`;
