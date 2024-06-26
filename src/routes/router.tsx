import ErrorBoundary from '@/components/ErrorBoundary';
import ForgetPassword from '@/pages/Account/ForgetPassword';
import Community from '@/pages/Account/User/Community';
import CommunityCreate from '@/pages/Account/User/Community/Create';
import CommunityDetail from '@/pages/Account/User/Community/Detail';
import CompanyRecruitment from '@/pages/Account/User/Company/Recruitment';
import CompanyRecruitmentDetail from '@/pages/Account/User/Company/Recruitment/Detail';
import ApplyResume from '@/pages/Account/User/Company/Recruitment/Detail/Resume';
import RecruitmentEdit from '@/pages/Account/User/Company/Recruitment/Edit';
import CompanyRecruitmentGenerat from '@/pages/Account/User/Company/Recruitment/Generate';
import Init from '@/pages/Account/User/Intern/Init';
import InitSchool from '@/pages/Account/User/Intern/Init/School';
import InitSkill from '@/pages/Account/User/Intern/Init/Skill';
import InternRecruitment from '@/pages/Account/User/Intern/Recruitment';
import InternApply from '@/pages/Account/User/Intern/Recruitment/Apply';
import Resume from '@/pages/Account/User/Intern/Resume';
import ResumeRelative from '@/pages/Account/User/Intern/Resume/Detail';
import ResumeEdit from '@/pages/Account/User/Intern/Resume/Edit';
import ResumeGenerate from '@/pages/Account/User/Intern/Resume/Generate';
import ManageArea from '@/pages/Account/User/Manage/Area';
import ManageAreaList from '@/pages/Account/User/Manage/Area/List';
import ManageTag from '@/pages/Account/User/Manage/Tag';
import Message from '@/pages/Account/User/Message';
import Profile from '@/pages/Account/User/Profile';
import Search from '@/pages/Search';
import SearchCompany from '@/pages/Search/Company';
import SearchRecruitment from '@/pages/Search/Recruitment';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from '../pages';
import Login from '../pages/Account/Login';
import Register from '../pages/Account/Register';
import AuthRoute from './AuthRoute';
import InternRoute from './InternRoute';
import InternalUserRoute from './InternalUserRoute';
import MainRoute from './MainRoute';
import UnAuthRoute from './UnAuthRoute';
import UserRoute from './UserRoute';
import CompanyUserRoute from './CompanyUserRoute';
import SearchUser from '@/pages/Search/User';

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
          <Route
            path="Profile?"
            handle={{
              crumb: '個人首頁',
            }}
            element={<Profile />}
          ></Route>

          <Route path="Intern" element={<InternRoute />}>
            <Route path="Recruitment" handle={{ crumb: '職缺管理' }}>
              <Route path="" element={<InternRecruitment />} />
              <Route path="Apply/:recruitmentId" element={<InternApply />} handle={{ crumb: '申請職缺' }} />
            </Route>
            <Route path="Init">
              <Route path="" element={<Init />}></Route>
              <Route path="School" element={<InitSchool />}></Route>
              <Route path="Skill" element={<InitSkill />}></Route>
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
              </Route>
              <Route path="Generate" element={<ResumeGenerate />} handle={{ crumb: '建立履歷' }} />
              <Route path="Detail/:resumeId" element={<ResumeRelative />} handle={{ crumb: '履歷分析' }}>
                {' '}
              </Route>
            </Route>
          </Route>

          <Route path="Company" element={<CompanyUserRoute />}>
            <Route
              path="Recruitment"
              handle={{
                crumb: '職缺管理',
              }}
            >
              <Route path="" element={<CompanyRecruitment />} />
              <Route path="Edit/:recruitmentId?" handle={{ crumb: '編輯職缺' }}>
                <Route path="" element={<RecruitmentEdit />} />
              </Route>
              <Route path="Generate" handle={{ crumb: '建立職缺' }} element={<CompanyRecruitmentGenerat />}></Route>
              <Route path="Detail/:recruitmentId?" handle={{ crumb: '應徵履歷分析' }}>
                <Route path="" element={<CompanyRecruitmentDetail />} />
                <Route path="Resume/:resumeId" element={<ApplyResume />} handle={{ crumb: '履歷資訊' }} />
              </Route>
            </Route>
          </Route>

          <Route path="Community" handle={{ crumb: '社群' }}>
            <Route element={<Community />} path="" />
            <Route element={<CommunityDetail />} path="Detail" />
            <Route element={<CommunityCreate />} path="Create" />
          </Route>
          <Route element={<Message />} path="Message" handle={{ crumb: '訊息' }} />

          <Route element={<InternalUserRoute />} path="Manage">
            <Route path="Tag" element={<ManageTag />} handle={{ crumb: '標籤管理' }}></Route>
            <Route path="Area" handle={{ crumb: '區塊管理' }}>
              <Route path="" element={<ManageArea />}></Route>
              <Route path="List/:areaTypeId" element={<ManageAreaList />} handle={{ crumb: '列表管理' }}></Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="Search">
      <Route path="" element={<Search />} />
      <Route path="Recruitment/:recruitmentId" element={<SearchRecruitment />} />
      <Route path="Company/:companyId" element={<SearchCompany />} />
      <Route path="User/:userId" element={<SearchUser />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export default router;
