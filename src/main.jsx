import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { routes } from "./Routes/routes";
import AuthProvider from "./Context/Provider/AuthProvider";
import { ThemeProvider } from "./Context/Context/ThemeProvider";
import { GroupsProvider } from "./Context/Context/GroupsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <ThemeProvider>
      <AuthProvider>
        <GroupsProvider>
          <RouterProvider router={routes} />
        </GroupsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
