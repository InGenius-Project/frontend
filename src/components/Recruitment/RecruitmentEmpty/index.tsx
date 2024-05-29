import Taken from '@/assets/images/svg/taken.svg?react';
import { useAppSelector } from '@/features/store';
import { UserRole } from '@/types/enums/UserRole';
import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

function RecruitmentEmpty() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const userState = useAppSelector((state) => state.userState);
  const location = useLocation();
  const navigate = useNavigate();

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
          width: isMobile ? '8em' : '15em',
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
          state={{
            from: location,
          }}
        >
          按此{userState.User?.Role === UserRole.Company ? '新增' : '收藏'}一份職缺
        </Link>
      </Typography>
    </Box>
  );
}

export default RecruitmentEmpty;
