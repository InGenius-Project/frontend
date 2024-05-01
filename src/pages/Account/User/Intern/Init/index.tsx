import { useGetUserQuery } from '@/features/api/user/getUser';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Start from '@/assets/images/svg/start.svg?react';
import InitContainer from '@/components/InitContainer';

function Init() {
  const { data: userData } = useGetUserQuery();
  const navigate = useNavigate();

  return (
    <InitContainer
      leftComponent={
        <Stack spacing={1}>
          <Typography variant="h3">歡迎，{userData?.result?.Username}</Typography>
          <Typography variant="body1">為了讓我們更了解您，請填寫以下的問題</Typography>
          <Box>
            <Button onClick={() => navigate('./School')}>開始填寫</Button>
          </Box>
        </Stack>
      }
      rightComponent={<Start width="100%" />}
    />
  );
}

export default Init;
