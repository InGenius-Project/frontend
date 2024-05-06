import { UserRole } from '@/types/enums/UserRole';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MessageIcon from '@mui/icons-material/Message';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import { OwnerAvatar } from '../UserAvatar';
import { Box, styled } from '@mui/material';

const LeftIcon = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  width: '24px',
  height: '24px',
  alignItems: 'center',
}));

const navigationConfig = [
  {
    role: UserRole.Intern,
    items: [
      {
        name: '個人首頁',
        value: 'Profile',
        icon: (
          <LeftIcon>
            <OwnerAvatar size="2em" />
          </LeftIcon>
        ),
      },
      {
        name: '履歷管理',
        value: 'Intern/Resume',
        icon: (
          <LeftIcon>
            <InsertDriveFileIcon />
          </LeftIcon>
        ),
      },
      {
        name: '職缺管理',
        value: 'Intern/Recruitment',
        icon: (
          <LeftIcon>
            <WorkIcon />
          </LeftIcon>
        ),
      },
      {
        name: '社群',
        value: 'Community',
        icon: (
          <LeftIcon>
            <PeopleIcon />
          </LeftIcon>
        ),
      },
      {
        name: '訊息',
        value: 'Message',
        icon: (
          <LeftIcon>
            <MessageIcon />
          </LeftIcon>
        ),
      },
    ],
  },
  {
    role: UserRole.Company,
    items: [
      {
        name: '公司首頁',
        value: 'Profile',
        icon: (
          <LeftIcon>
            <Box width="24px" height="24px">
              <OwnerAvatar />
            </Box>
          </LeftIcon>
        ),
      },
      {
        name: '職缺管理',
        value: 'Company/Recruitment',
        icon: (
          <LeftIcon>
            <WorkIcon />
          </LeftIcon>
        ),
      },
      {
        name: '社群',
        value: 'Community',
        icon: (
          <LeftIcon>
            <PeopleIcon />
          </LeftIcon>
        ),
      },
      {
        name: '訊息',
        value: 'Message',
        icon: (
          <LeftIcon>
            <MessageIcon />
          </LeftIcon>
        ),
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
        icon: (
          <LeftIcon>
            <LocalOfferIcon />
          </LeftIcon>
        ),
      },
      {
        name: '區塊管理',
        value: 'Manage/Area',
        icon: (
          <LeftIcon>
            <DashboardIcon />
          </LeftIcon>
        ),
      },
      {
        name: '訊息',
        value: 'Message',
        icon: (
          <LeftIcon>
            <MessageIcon />
          </LeftIcon>
        ),
      },
      {
        name: '社群',
        value: 'Community',
        icon: (
          <LeftIcon>
            <PeopleIcon />
          </LeftIcon>
        ),
      },
    ],
  },
];
export const getNavigationConfig = (role: UserRole) => {
  return navigationConfig.find((config) => config.role === role)?.items;
};
