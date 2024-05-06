import Taken from '@/assets/images/svg/taken.svg?react';
import { Button, Stack, Typography } from '@mui/material';

function ManageProfileEmptyItem() {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Taken
        style={{
          height: '20em',
          width: 'auto',
        }}
      />

      <Typography variant="body1">找不到任何的履歷</Typography>
    </Stack>
  );
}

export default ManageProfileEmptyItem;
