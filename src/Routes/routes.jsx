import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Index from "../Pages/Index";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import GroupList from "../Pages/GroupList";
import GroupDetail from "../Pages/GroupDetail";
import CreateGroup from "../Pages/CreateGroup";
import MyGroups from "../Pages/MyGroups";

import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import UpdateGroup from "../Pages/UpdateGroup";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />, // Layout component
    children: [
      { path: "/", element: <Index /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/groups", element: <GroupList /> },

      {
        path: "/group/:id",
        element: (
          <PrivateRoute>
            <GroupDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-group",
        element: (
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-groups",
        element: (
          <PrivateRoute>
            <MyGroups />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-group/:id",
        element: (
          <PrivateRoute>
            <UpdateGroup />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
