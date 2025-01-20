import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  const username = localStorage.getItem("userName");
  return (
    <HeaderWrapper>
      <BreadcrumbWrapper>
        <BreadcrumbItem href="/user">User</BreadcrumbItem>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbItem href="/user/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbItem href="/user/dashboard/home">Home</BreadcrumbItem>
      </BreadcrumbWrapper>
      <WelcomeText>Seja bem-vindo, {username}</WelcomeText>
    </HeaderWrapper>
  );
};

// Estilos do Header
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

// Estilos do Breadcrumb
const BreadcrumbWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled.a`
  text-decoration: none;
  color: #2c3e50;
  font-size: 0.9rem;

  &:hover {
    color: #1d72b8;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

// Estilos para o texto de boas-vindas
const WelcomeText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
`;
