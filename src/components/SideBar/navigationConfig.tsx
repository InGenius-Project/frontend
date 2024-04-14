import { UserRole } from '@/types/enums/UserRole';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
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
        icon: <InsertDriveFileOutlinedIcon />,
      },
      {
        name: '職缺管理',
        value: 'Intern/Recruitment',
        icon: <WorkOutlineOutlinedIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageOutlinedIcon />,
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
        icon: <WorkOutlineOutlinedIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageOutlinedIcon />,
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
        icon: <LocalOfferOutlinedIcon />,
      },
      {
        name: '區塊管理',
        value: 'Manage/Area',
        icon: <DashboardOutlinedIcon />,
      },
      {
        name: '訊息',
        value: 'Message',
        icon: <MessageOutlinedIcon />,
      },
    ],
  },
];
export const getNavigationConfig = (role: UserRole) => {
  return navigationConfig.find((config) => config.role === role)?.items;
};
