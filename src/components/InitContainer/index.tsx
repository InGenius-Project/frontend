import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';

type InitContainerProps = {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
};

function InitContainer({ leftComponent, rightComponent }: InitContainerProps) {
  return (
    <Grid2
      container
      spacing={4}
      sx={{
        p: 2,
        alignItems: 'center',
      }}
    >
      <Grid2 mobile={12} tablet={6}>
        {leftComponent}
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
        <Box
          sx={{
            width: '20em',
            height: 'fit-content',
          }}
        >
          {rightComponent}
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default InitContainer;
