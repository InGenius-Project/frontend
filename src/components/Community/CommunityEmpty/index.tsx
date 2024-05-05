import { Box, Link, Stack, Typography } from '@mui/material';
import NoData from '@/assets/images/svg/noData.svg?react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

function CommunityEmpty() {
  return (
    <Stack spacing={1} direction={'row'} sx={{ py: 2 }}>
      <Box>
        <NoData
          style={{
            height: '5em',
            width: 'auto',
          }}
        />
      </Box>
      <Stack spacing={1}>
        <Typography variant="body1">已經沒有任何貼文了</Typography>
        <Link component={RouterLink} to="/Account/User/Community/Create">
          按此新增一個貼文
        </Link>
      </Stack>
    </Stack>
  );
}

export default CommunityEmpty;
