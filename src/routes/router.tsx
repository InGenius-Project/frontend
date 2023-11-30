import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainRoute from "./MainRoute";
import Root from "../pages";
import Register from "../pages/Account/Register";
import Login from "../pages/Account/Login";
import ForgetPassword from "pages/Account/ForgetPassword";
import Profile from "pages/Account/User/Profile";
import UserRoute from "./UserRoute";
import Intern from "pages/Account/User/Intern";
import Resume from "pages/Account/User/Resume";
import ProfileNew from "pages/Account/User/Profile/New";
import Edit from "pages/Account/User/Profile/Edit";
import Layout from "pages/Account/User/Profile/Layout";
import AuthRoute from "./AuthRoute";
import UnAuthRoute from "./UnAuthRoute";

declare module "@remix-run/router/dist/utils" {
  type AgnosticBaseRouteObject = {
    handle?: {
      crumb: string;
    };
  };
}

const routes = createRoutesFromElements(
  <Route element={<MainRoute />}>
    <Route index element={<Root />} />
    <Route path="Account">
      <Route element={<UnAuthRoute />}>
        <Route element={<Login />} path="Login?" />
        <Route element={<Register />} path="Register" />
        <Route element={<ForgetPassword />} path="ForgetPassword" />
      </Route>
      <Route element={<AuthRoute />}>
        <Route element={<UserRoute />} path="User">
          <Route
            path="Profile?"
            handle={{
              crumb: "個人首頁",
            }}
          >
            <Route element={<Profile />} index />
            <Route path="New" handle={{ crumb: "新增區塊" }}>
              <Route index element={<ProfileNew />} />
              <Route
                element={<Edit />}
                path="Edit/:type?"
                handle={{ crumb: "編輯內容" }}
              ></Route>
              <Route
                element={<Layout />}
                path="Layout"
                handle={{ crumb: "區塊排列方式" }}
              />
            </Route>
          </Route>
          <Route
            element={<Resume />}
            path="Resume"
            handle={{
              crumb: "履歷管理",
            }}
          />
          <Route
            element={<Intern />}
            path="Intern"
            handle={{
              crumb: "實習管理",
            }}
          />
        </Route>
      </Route>
    </Route>
  </Route>
);

export { routes };

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
