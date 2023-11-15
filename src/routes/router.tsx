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
import ResumeEdit from "pages/Account/User/Resume/Edit";

declare module "@remix-run/router/dist/utils" {
  type AgnosticBaseRouteObject = {
    handle?: {
      crumb: string;
    };
  };
}

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
                handle: {
                  crumb: "個人首頁",
                },
              },
              {
                path: "Resume",
                element: <Resume />,
                handle: {
                  crumb: "履歷",
                },
                children: [
                  {
                    path: "Edit",
                    element: <ResumeEdit />,
                    handle: {
                      crumb: "履歷編輯",
                    },
                  },
                ],
              },
              {
                path: "Intern",
                element: <Intern />,
                handle: {
                  crumb: "實習",
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
