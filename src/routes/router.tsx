import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import Root from "../pages";
import Register from "../pages/Account/Register";
import Login from "../pages/Account/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    children: [
      {
        path: "",
        element: <Root />,
      },
      {
        path: "Account",
        children: [
          {
            path: "Login",
            element: <Login />,
          },
          {
            path: "Register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);
