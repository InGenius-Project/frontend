import { useGetUserQuery } from '@/features/api/user/getUser';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Start from '@/assets/images/svg/start.svg?react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

function Init() {
  const { data: userData } = useGetUserQuery();
  const navigate = useNavigate();

  return (
    <Box>
      <Grid2
        container
        spacing={4}
        sx={{
          py: '2em',
        }}
      >
        <Grid2 mobile={12} tablet={6}>
          <Stack spacing={1}>
            <Typography variant="h3">歡迎，{userData?.result?.Username}</Typography>
            <Typography variant="body1">為了讓我們更了解您，請填寫以下的問題</Typography>
            <Button onClick={() => navigate('./School')}>開始填寫</Button>
          </Stack>
        </Grid2>
        <Grid2
          mobile={12}
          tablet={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Start
            style={{
              width: '60%',
              height: 'auto',
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Init;
