import { House, ListChecks, User, SignOut } from "phosphor-react"; // Importando os ícones

export const menuItems = [
  { id: "home", label: "Home", path: "/user/dashboard/home", icon: <House size={20} /> },
  { id: "tasks", label: "Tarefas", path: "/user/dashboard/tasks", icon: <ListChecks size={20} /> },
  { id: "logout", label: "Sair", path: "/", icon: <SignOut size={20} />, isLogout: true },
];
