import ForgetPassword from '@/pages/Account/ForgetPassword';
import ManageArea from '@/pages/Account/User/Manage/Area';
import ManageAreaList from '@/pages/Account/User/Manage/Area/List';
import ManageTag from '@/pages/Account/User/Manage/Tag';
import Profile from '@/pages/Account/User/Profile';
import ProfileArea from '@/pages/Account/User/Profile/Area';
import ProfileAreaLayout from '@/pages/Account/User/Profile/Layout';
import ProfileAreaNew from '@/pages/Account/User/Profile/New';
import Recruitment from '@/pages/Account/User/Recruitment';
import RecruitmentEdit from '@/pages/Account/User/Recruitment/Edit';
import RecruitmentArea from '@/pages/Account/User/Recruitment/Edit/Area';
import RecruitmentAreaLayout from '@/pages/Account/User/Recruitment/Edit/Layout';
import RecruitementAreaNew from '@/pages/Account/User/Recruitment/Edit/New';
import Resume from '@/pages/Account/User/Resume';
import ResumeEdit from '@/pages/Account/User/Resume/Edit';
import ResumeArea from '@/pages/Account/User/Resume/Edit/Area';
import ResumeAreaLayout from '@/pages/Account/User/Resume/Edit/Layout';
import ResumeAreaNew from '@/pages/Account/User/Resume/Edit/New';
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

declare module '@remix-run/router/dist/utils' {
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
            <Route path="Init">
              <Route path="Department" element={<InitDepartment />}></Route>
            </Route>
            <Route
              path="Profile?"
              handle={{
                crumb: '個人首頁',
              }}
              element={<Profile />}
            >
              <Route path="Area/:areaId?" handle={{ crumb: '編輯區塊內容' }} element={<ProfileArea />}></Route>
              <Route path="New" handle={{ crumb: '新增個人首頁區塊' }} element={<ProfileAreaNew />}></Route>
              <Route path="Layout" handle={{ crumb: '選擇區塊排列方式' }} element={<ProfileAreaLayout />}></Route>
            </Route>
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
                <Route
                  element={<ResumeAreaNew />}
                  path="New"
                  handle={{
                    crumb: '新增履歷區塊',
                  }}
                ></Route>
                <Route
                  element={<ResumeAreaLayout />}
                  path="Layout"
                  handle={{
                    crumb: '選擇區塊排列方式',
                  }}
                ></Route>
                <Route
                  element={<ResumeArea />}
                  path="Area/:areaId?"
                  handle={{
                    crumb: '編輯區塊內容',
                  }}
                ></Route>
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
                <Route
                  element={<RecruitementAreaNew />}
                  path="New"
                  handle={{
                    crumb: '新增履歷區塊',
                  }}
                />
                <Route
                  element={<RecruitmentAreaLayout />}
                  path="Layout"
                  handle={{
                    crumb: '選擇區塊排列方式',
                  }}
                />
                <Route
                  element={<RecruitmentArea />}
                  path="Area/:areaId?"
                  handle={{
                    crumb: '編輯區塊內容',
                  }}
                />
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
    </Route>,
  ),
);

export default router;
