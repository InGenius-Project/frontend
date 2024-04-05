import ForgetPassword from '@/pages/Account/ForgetPassword';
import ManageArea from '@/pages/Account/User/Manage/Area';
import ManageAreaList from '@/pages/Account/User/Manage/Area/List';
import ManageTag from '@/pages/Account/User/Manage/Tag';
import Profile from '@/pages/Account/User/Profile';
import Recruitment from '@/pages/Account/User/Recruitment';
import RecruitmentEdit from '@/pages/Account/User/Recruitment/Edit';
import Resume from '@/pages/Account/User/Resume';
import ResumeEdit from '@/pages/Account/User/Resume/Edit';
import InitDepartment from '@/pages/Account/User/Init/Department';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from '../pages';
import Login from '../pages/Account/Login';
import Register from '../pages/Account/Register';
import AuthRoute from './AuthRoute';
import InternalUserRoute from './InternalUserRoute';
import MainRoute from './MainRoute';
import UnAuthRoute from './UnAuthRoute';
import UserRoute from './UserRoute';
import Message from '@/pages/Account/User/Message';
import ErrorBoundary from '@/components/ErrorBoundary';

declare module '@remix-run/router/dist/utils' {
  type AgnosticBaseRouteObject = {
    handle?: {
      crumb: string;
    };
  };
}

export const routes = (
  <Route element={<MainRoute />} errorElement={<ErrorBoundary />}>
    <Route index element={<Root />} />
    <Route path="Account">
      <Route element={<UnAuthRoute />}>
        <Route element={<Login />} path="Login?" />
        <Route element={<Register />} path="Register" />
        <Route element={<ForgetPassword />} path="ForgetPassword" />
      </Route>
      <Route element={<AuthRoute />}>
        <Route element={<UserRoute />} path="User">
          <Route path="Init">
            <Route path="Department" element={<InitDepartment />}></Route>
          </Route>
          <Route
            path="Profile?"
            handle={{
              crumb: '個人首頁',
            }}
            element={<Profile />}
          ></Route>
          <Route
            path="Resume"
            handle={{
              crumb: '履歷管理',
            }}
          >
            <Route path="" element={<Resume />} />
            <Route
              path="Edit/:resumeId?"
              handle={{
                crumb: '履歷編輯',
              }}
            >
              <Route element={<ResumeEdit />} path="" />
            </Route>
          </Route>
          <Route
            path="Recruitment"
            handle={{
              crumb: '職缺管理',
            }}
          >
            <Route path="" element={<Recruitment />} />
            <Route path="Edit/:recruitmentId?" handle={{ crumb: '編輯職缺' }}>
              <Route path="" element={<RecruitmentEdit />} />
            </Route>
          </Route>
          <Route element={<InternalUserRoute />} path="Manage">
            <Route path="Tag" element={<ManageTag />} handle={{ crumb: '標籤管理' }}></Route>
            <Route path="Area" handle={{ crumb: '區塊管理' }}>
              <Route path="" element={<ManageArea />}></Route>
              <Route path="List/:areaTypeId" element={<ManageAreaList />} handle={{ crumb: '列表管理' }}></Route>
            </Route>
          </Route>
          <Route element={<Message />} path="Message" handle={{ crumb: '訊息' }} />
        </Route>
      </Route>
    </Route>
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export default router;
