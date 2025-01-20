import React from "react";
import styled from "styled-components";

interface TaskFilterProps {
  onFilterChange: (filters: { status: string; priority: string }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value, priority: "" });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: "", priority: e.target.value });
  };

  return (
    <FilterWrapper>
      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <select id="status" onChange={handleStatusChange}>
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="emProgresso">Em Progresso</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="priority">Prioridade:</label>
        <select id="priority" onChange={handlePriorityChange}>
          <option value="">Todas</option>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </FilterWrapper>
  );
};

export default TaskFilter;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  .filter-group {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
  }
`;
