import React from "react";
import styled from "styled-components";
import { menuItems } from "../constants/menu-items";
import { House, ListChecks, User, SignOut } from "phosphor-react"; // Importando os ícones do Phosphor Icons

export const Menu: React.FC = () => {
  return (
    <Sidebar>
      <Logo>Taskify</Logo>
      <MenuList>
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={item.path} className={item.isLogout ? "logout" : ""}>
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </MenuList>
    </Sidebar>
  );
};

/* Styled Components */
const Sidebar = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ecf0f1;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3498db;
    }

    &.logout {
      color: #e74c3c;

      &:hover {
        background-color: #c0392b;
      }
    }
  }
`;
