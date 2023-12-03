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
import ProfileNew from "components/Area/AreaNewModel";
import ResumeEdit from "pages/Account/User/Resume/Edit";
import ResumeAreaLayout from "pages/Account/User/Resume/Edit/Layout";
import ResumeAreaNew from "pages/Account/User/Resume/Edit/New";
import AuthRoute from "./AuthRoute";
import UnAuthRoute from "./UnAuthRoute";
import ResumeArea from "pages/Account/User/Resume/Edit/Area";

declare module "@remix-run/router/dist/utils" {
  type AgnosticBaseRouteObject = {
    handle?: {
      crumb: string;
    };
  };
}

const router = createBrowserRouter(
  createRoutesFromElements(
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
              </Route>
            </Route>
            <Route
              path="Resume"
              handle={{
                crumb: "履歷管理",
              }}
            >
              <Route path="" element={<Resume />} />
              <Route
                path="Edit/:resumeId?"
                handle={{
                  crumb: "履歷編輯",
                }}
              >
                <Route element={<ResumeEdit />} path="" />
                <Route
                  element={<ResumeAreaNew />}
                  path="New"
                  handle={{
                    crumb: "新增履歷區塊",
                  }}
                ></Route>
                <Route
                  element={<ResumeAreaLayout />}
                  path="Layout"
                  handle={{
                    crumb: "選擇區塊排列方式",
                  }}
                ></Route>
                <Route
                  element={<ResumeArea />}
                  path="Area/:areaId"
                  handle={{
                    crumb: "編輯區塊內容",
                  }}
                ></Route>
              </Route>
            </Route>
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
  )
);

export default router;
