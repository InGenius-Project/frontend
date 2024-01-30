import ForgetPassword from "pages/Account/ForgetPassword";
import Profile from "pages/Account/User/Profile";
import ProfileArea from "pages/Account/User/Profile/Area";
import ProfileAreaLayout from "pages/Account/User/Profile/Layout";
import ProfileAreaNew from "pages/Account/User/Profile/New";
import Recruitment from "pages/Account/User/Recruitment";
import RecruitmentEdit from "pages/Account/User/Recruitment/Edit";
import Resume from "pages/Account/User/Resume";
import ResumeEdit from "pages/Account/User/Resume/Edit";
import ResumeArea from "pages/Account/User/Resume/Edit/Area";
import ResumeAreaLayout from "pages/Account/User/Resume/Edit/Layout";
import ResumeAreaNew from "pages/Account/User/Resume/Edit/New";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "../pages";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
import AuthRoute from "./AuthRoute";
import MainRoute from "./MainRoute";
import UnAuthRoute from "./UnAuthRoute";
import UserRoute from "./UserRoute";
import RecruitementAreaNew from "pages/Account/User/Recruitment/Edit/New";
import RecruitmentAreaLayout from "pages/Account/User/Recruitment/Edit/Layout";
import RecruitmentArea from "pages/Account/User/Recruitment/Edit/Area";
import InternalUserRoute from "./InternalUserRoute";
import Tag from "pages/Account/User/Tag";

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
              <Route path="Area/:areaId?" handle={{ crumb: "編輯區塊內容" }}>
                <Route index element={<ProfileArea />} />
              </Route>
              <Route path="New" handle={{ crumb: "新增個人首頁區塊" }}>
                <Route index element={<ProfileAreaNew />} />
              </Route>
              <Route path="Layout" handle={{ crumb: "選擇區塊排列方式" }}>
                <Route index element={<ProfileAreaLayout />} />
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
                  path="Area/:areaId?"
                  handle={{
                    crumb: "編輯區塊內容",
                  }}
                ></Route>
              </Route>
            </Route>
            <Route
              path="Recruitment"
              handle={{
                crumb: "職缺管理",
              }}
            >
              <Route path="" element={<Recruitment />} />
              <Route path="Edit/:recruitmentId?" handle={{ crumb: "編輯職缺" }}>
                <Route path="" element={<RecruitmentEdit />} />
                <Route
                  element={<RecruitementAreaNew />}
                  path="New"
                  handle={{
                    crumb: "新增履歷區塊",
                  }}
                />
                <Route
                  element={<RecruitmentAreaLayout />}
                  path="Layout"
                  handle={{
                    crumb: "選擇區塊排列方式",
                  }}
                />
                <Route
                  element={<RecruitmentArea />}
                  path="Area/:areaId?"
                  handle={{
                    crumb: "編輯區塊內容",
                  }}
                />
              </Route>
            </Route>
            <Route element={<InternalUserRoute />}>
              <Route
                path="Tag"
                element={<Tag />}
                handle={{ crumb: "標籤管理" }}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
