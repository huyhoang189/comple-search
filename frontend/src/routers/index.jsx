import { createBrowserRouter } from "react-router-dom";
import Layouts from "../layouts/admin";
import Departments from "../pages/department";
import Login from "../pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "departments",
        element: <Departments />,
      },
    ],
  },
]);
