import React from "react";
import styled from "styled-components";
import { CheckCircle, Clock, XCircle } from "phosphor-react";

interface TaskSummaryCardProps {
  type: "finalizada" | "emProgresso" | "pendente";
  count: number;
}

const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #888;
  }
`;

export const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ type, count }) => {
  const iconProps = { size: 32 };

  const icon =
    type === "finalizada" ? (
      <CheckCircle color="#4CAF50" {...iconProps} />
    ) : type === "emProgresso" ? (
      <Clock color="#FF9800" {...iconProps} />
    ) : (
      <XCircle color="#F44336" {...iconProps} />
    );

  const label =
    type === "finalizada" ? "Concluídas" : type === "emProgresso" ? "Em Progresso" : "Pendentes";

  return (
    <Card>
      {icon}
      <h3>{count}</h3>
      <p>{label}</p>
    </Card>
  );
};
