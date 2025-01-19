import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";
import { registerUser } from "./api/registerUser.ts"; // Função para chamada à API

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(username, email, password);
      toast.success("Usuário registrado com sucesso!");
      navigate("/"); // Redireciona para a página de login
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nome de Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p>
          Já tem uma conta?{" "}
          <button onClick={() => navigate("/")} className="login-link">
            Faça login
          </button>
        </p>
      </FormWrapper>
    </Container>
  );
};

/* Styled Components */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
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

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      color: #333;
      &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
      }
    }

    button[type="submit"] {
      background-color: #007bff;
      color: white;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
      }
    }
  }

  p {
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;

    .login-link {
      background: none;
      border: none;
      color: #007bff;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        color: #0056b3;
      }
    }
  }
`;
