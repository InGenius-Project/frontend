import NoData from '@/assets/images/svg/noData.svg?react';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { UserRole } from '@/types/enums/UserRole';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function MessageChannelEmptyItem() {
  const { data: userData } = useGetUserQuery();

  return (
    <Stack
      spacing={1}
      direction={'row'}
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '3em',
          height: 'auto',
        }}
      >
        <NoData
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Box>
        <Typography variant="body1">
          找不到任何聊天室，
          <br />
          <Link
            component={RouterLink}
            to={`/Account/User${userData?.result?.Role === UserRole.Company ? '/Company' : userData?.result?.Role === UserRole.Intern ? '/Intern' : ''}/Recruitment`}
          >
            按此前往職缺管理並建立的聯繫
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
}

export default MessageChannelEmptyItem;
