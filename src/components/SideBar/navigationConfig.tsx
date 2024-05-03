import { UserRole } from '@/types/enums/UserRole';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MessageIcon from '@mui/icons-material/Message';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import { OwnerAvatar } from '../UserAvatar';

const navigationConfig = [
  {
    role: UserRole.Intern,
    items: [
      {
        name: '個人首頁',
        value: 'Profile',
        icon: <OwnerAvatar />,
      },
      {
        name: '履歷管理',
        value: 'Intern/Resume',
        icon: <InsertDriveFileIcon />,
      },
      {
        name: '職缺管理',
        value: 'Intern/Recruitment',
        icon: <WorkIcon />,
      },
      {
        name: '社群',
        value: 'Community',
        icon: <PeopleIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageIcon />,
      },
    ],
  },
  {
    role: UserRole.Company,
    items: [
      {
        name: '公司首頁',
        value: 'Profile',
        icon: <OwnerAvatar />,
      },
      {
        name: '職缺管理',
        value: 'Company/Recruitment',
        icon: <WorkIcon />,
      },
      {
        name: '社群',
        value: 'Community',
        icon: <PeopleIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageIcon />,
      },
    ],
  },
  {
    role: UserRole.Admin,
    items: [],
  },
  {
    role: UserRole.InternalUser,
    items: [
      {
        name: '標籤管理',
        value: 'Manage/Tag',
        icon: <LocalOfferIcon />,
      },
      {
        name: '區塊管理',
        value: 'Manage/Area',
        icon: <DashboardIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageIcon />,
      },
      {
        name: '社群',
        value: 'Community',
        icon: <PeopleIcon />,
      },
    ],
  },
];
export const getNavigationConfig = (role: UserRole) => {
  return navigationConfig.find((config) => config.role === role)?.items;
};
