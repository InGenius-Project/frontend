import React from 'react';
import Taken from '@/assets/images/svg/taken.svg?react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { useAppSelector } from '@/features/store';
import { UserRole } from '@/types/enums/UserRole';

function RecruitmentEmpty() {
  const userState = useAppSelector((state) => state.userState);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 4,
        gap: 1,
      }}
    >
      <Taken
        style={{
          width: '15em',
          height: 'auto',
        }}
      />
      <Typography variant="h4" color="textSecondary">
        找不到職缺
      </Typography>
      <Typography variant="body1">
        請嘗試變更搜尋條件，或
        <Link
          component={RouterLink}
          to={userState.User?.Role === UserRole.Company ? '/Account/User/Intern/Resume/Generate' : '/Search'}
        >
          按此{userState.User?.Role === UserRole.Company ? '新增' : '收藏'}一份職缺
        </Link>
      </Typography>
    </Box>
  );
}

export default RecruitmentEmpty;
