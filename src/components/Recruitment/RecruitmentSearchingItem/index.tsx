import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

function RecruitmentSearchingItem() {
  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography>實習搜尋中</Typography>
      </Stack>
    </Paper>
  );
}

export default RecruitmentSearchingItem;
