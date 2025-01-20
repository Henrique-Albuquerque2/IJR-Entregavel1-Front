import React, { useState } from "react";
import styled from "styled-components";

interface TaskFilterProps {
  onFilterChange: (filters: { status: string; priority: string }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ status, priority });
  };

  return (
    <FilterContainer>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="emProgresso">Em Progresso</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority">Prioridade:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Todas</option>
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </FilterContainer>
  );
};


/* Styled Components */
const FilterContainer = styled.div`
display: flex;
gap: 1rem;
margin-bottom: 1rem;

label {
    margin-right: 0.5rem;
    font-size: 0.9rem;
    }
    
    select {
        padding: 0.4rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        }
        `;
        
export default TaskFilter;
