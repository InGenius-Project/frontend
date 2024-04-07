import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

function RecruitmentEmptyItem() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Typography variant="h6">查無職缺 </Typography>
    </Box>
  );
}

export default RecruitmentEmptyItem;
