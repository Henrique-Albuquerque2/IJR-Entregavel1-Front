import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Doughnut } from "react-chartjs-2";
import { fetchTaskSummary } from "./api/fetchTaskSummary";
import { TaskSummaryCard } from "./components/TaskSummaryCard";
import "../../../../config/chart.config"; // Importa a configuração do Chart.js

// Estilização
const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;

  &.chart-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
`;

const ChartWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Legend = styled.div`
  margin-top: 1rem;

  p {
    margin: 0.2rem 0;
    font-size: 1rem;
    color: #555;
  }
`;

// Função principal
export const Home = () => {
  const [taskSummary, setTaskSummary] = useState({
    finalizada: 0,
    emProgresso: 0,
    pendente: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaskSummary(localStorage.getItem("token") || "");
        console.log("Dados recebidos:", data); // Verifique os dados no console
        setTaskSummary(data);
        toast.success("Dados carregados com sucesso!");
      } catch (error) {
        toast.error("Erro ao carregar os dados do resumo!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dados do gráfico Doughnut
  const doughnutData = {
    labels: ["finalizado", "Em Progresso", "Pendentes"],
    datasets: [
      {
        label: "Tarefas",
        data: [taskSummary.finalizada, taskSummary.emProgresso, taskSummary.pendente],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      {/* Coluna dos Cards */}
      <Column>
        <TaskSummaryCard type="finalizada" count={loading ? 0 : taskSummary.finalizada} />
        <TaskSummaryCard type="emProgresso" count={loading ? 0 : taskSummary.emProgresso} />
        <TaskSummaryCard type="pendente" count={loading ? 0 : taskSummary.pendente} />
      </Column>

      {/* Coluna do Gráfico */}
      <Column className="chart-column">
        <Title>Resumo das Tarefas</Title>
        <ChartWrapper>
          <Doughnut data={doughnutData} />
        </ChartWrapper>
        <Legend>
          <p>
            <span style={{ color: "#4CAF50", fontWeight: "bold" }}>⬤</span> Concluídas
          </p>
          <p>
            <span style={{ color: "#FF9800", fontWeight: "bold" }}>⬤</span> Em Progresso
          </p>
          <p>
            <span style={{ color: "#F44336", fontWeight: "bold" }}>⬤</span> Pendentes
          </p>
        </Legend>
      </Column>
    </Container>
  );
};
