import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import Root from "../pages";
import Register from "../pages/Account/Register";
import Login from "../pages/Account/Login";
import ForgetPassword from "pages/Account/ForgetPassword";
import Profile from "pages/Account/User/Profile";
import UserRoute from "./UserRoute";
import Intern from "pages/Account/User/Intern";
import Resume from "pages/Account/User/Resume";

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
          {
            path: "ForgetPassword",
            element: <ForgetPassword />,
          },
          {
            path: "User",
            element: <UserRoute />,
            children: [
              {
                path: "Profile?",
                element: <Profile />,
              },
              {
                path: "Resume",
                element: <Resume />,
              },
              {
                path: "Intern",
                element: <Intern />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
