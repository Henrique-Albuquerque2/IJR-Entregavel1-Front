import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "phosphor-react";
import { loginUser } from "./api/loginUser";
import styled from "styled-components";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);

      // Verifica se a resposta contém os dados esperados
      if (response && response.access_token) {
        const token = response.access_token;
        localStorage.setItem("token", token);

        toast.success("Login realizado com sucesso!");
        navigate("/user/dashboard/home");
      } else {
        throw new Error("Resposta da API inválida. Verifique os detalhes do servidor.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="password-wrapper">
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p>
          Não tem uma conta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Registre-se
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

    .password-wrapper {
      position: relative;

      .toggle-password {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
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

    .register-link {
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
