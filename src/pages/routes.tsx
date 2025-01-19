import { RouteObject, redirect } from "react-router-dom";
import { Home } from "./dashboard/nested/home/homepage";
import { Tasks } from "./dashboard/nested/Tasks/Tasks";
import { Profile } from "./dashboard/nested/Profile/Profile";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage"; // Importando a página de registro
import { Dashboard } from "./dashboard/dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const routes: RouteObject[] = [
  // Rota de Login
  {
    path: "/",
    element: <LoginPage />,
    id: "login",
  },

  // Rota de Registro
  {
    path: "/register",
    element: <RegisterPage />, // Adicionando a rota de registro
    id: "register",
  },

  // Rotas do Dashboard (Protegidas)
  {
    path: "user/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    id: "dashboard",
    children: [
      {
        // Redireciona para /home por padrão
        index: true,
        loader: async () => redirect("/user/dashboard/home"),
      },
      {
        path: "home",
        element: <Home />,
        id: "home",
      },
      {
        path: "tasks",
        element: <Tasks />,
        id: "tasks",
      },
      {
        path: "profile",
        element: <Profile />,
        id: "profile",
      },
    ],
  },

  // Redirecionamento para Login caso a rota não exista
  {
    path: "*",
    loader: async () => redirect("/"),
  },
];
