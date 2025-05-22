import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateGroup from '../pages/CreateGroup';
import GroupDetails from '../pages/GroupDetails';
import AllGroups from '../pages/AllGroups';
import MyGroups from '../pages/MyGroups';
import UpdateGroup from '../pages/UpdateGroup';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/groups', element: <AllGroups /> },
      { path: '/createGroup', element: <CreateGroup /> },
      { path: '/group/:id', element: <GroupDetails /> },
      { path: '/myGroups', element: <MyGroups /> },
      { path: '/updateGroup/:id', element: <UpdateGroup /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
