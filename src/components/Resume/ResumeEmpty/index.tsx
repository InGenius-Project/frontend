import React from 'react';
import Taken from '@/assets/images/svg/taken.svg?react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ResumeEmpty() {
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
        找不到履歷
      </Typography>
      <Typography variant="body1">
        請嘗試變更搜尋條件，或
        <Link component={RouterLink} to="/Account/User/Intern/Resume/Generate">
          按此新增一份履歷
        </Link>
      </Typography>
    </Box>
  );
}

export default ResumeEmpty;
