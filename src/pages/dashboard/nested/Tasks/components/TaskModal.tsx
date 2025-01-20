import React, { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api/apiTasks";
import toast from "react-hot-toast";

interface TaskModalProps {
  closeModal: () => void;
  fetchTasks: () => Promise<void>;
}

export const TaskModal: React.FC<TaskModalProps> = ({ closeModal, fetchTasks }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pendente",
    priority: "média",
    due_date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask(taskData);
      toast.success("Tarefa adicionada com sucesso!");
      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Erro ao adicionar tarefa.");
    }
  };

  return (
    <ModalWrapper>
      <Overlay onClick={closeModal} />
      <ModalContent>
        <h3>Adicionar Nova Tarefa</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Título
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
              placeholder="Digite o título da tarefa"
            />
          </label>
          <label>
            Descrição
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              rows={3}
              required
              placeholder="Descreva a tarefa"
            />
          </label>
          <label>
            Status
            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
            >
              <option value="pendente">Pendente</option>
              <option value="emProgresso">Em Progresso</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </label>
          <label>
            Prioridade
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleInputChange}
            >
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
          </label>
          <label>
            Data de Fim
            <input
              type="date"
              name="due_date"
              value={taskData.due_date}
              onChange={handleInputChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Salvar
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

/* Styled Components */
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 100%;
  max-width: 400px;

  h3 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.5rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 0.9rem;
      color: #555;
      display: flex;
      flex-direction: column;

      input,
      textarea,
      select {
        margin-top: 0.5rem;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
        }
      }

      textarea {
        resize: none;
      }
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      .save-btn {
        flex: 1;
        background: #28a745;
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #218838;
        }
      }

      .cancel-btn {
        flex: 1;
        background: #dc3545;
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #c82333;
        }
      }
    }
  }
`;
