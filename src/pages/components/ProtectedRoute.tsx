import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redireciona para o login caso o token não exista
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
