import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {routes} from './pages/routes';

export const router = createBrowserRouter([
    ...routes,
    {
        path: "/app",
        element: <App />,
    }
]);

