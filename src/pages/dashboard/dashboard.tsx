import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Menu } from "./components/menu";
import { Header } from "./components/header";

export const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Menu />
      <MainContent>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </DashboardContainer>
  );
};

/* Styled Components */
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar com 250px e conteúdo principal ocupando o restante */
  grid-template-rows: 2 1fr; /* Navbar na primeira linha e conteúdo na segunda */
  height: 100vh;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Navbar na primeira linha e conteúdo na segunda */
`;

const Content = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  overflow-y: auto;
`;
