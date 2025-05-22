import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts />,
        children: [
            {
                path: '/',
                element: <Home />,
            }
        ]
    }
])