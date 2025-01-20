import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
  } from "chart.js";
  
  // Registra todos os elementos necessários para os gráficos
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title
  );
  