import NoData from '@/assets/images/svg/noData.svg?react';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

type AreaEmptyProps = {
  onClick?: () => void;
  editable?: boolean;
};

function AreaEmpty({ onClick: handleClick, editable = false }: AreaEmptyProps) {
  const theme = useTheme();

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    handleClick && handleClick();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        gap: 2,
      }}
    >
      <NoData style={{ width: '8em', height: 'auto' }} />
      <Stack spacing={1}>
        <Typography variant="body1" sx={{ color: theme.palette.primary.main }} fontWeight={'bold'}>
          Oh! 這個地方沒有任何區塊
        </Typography>
        {editable && (
          <Box>
            <Button variant="text" onClick={handleAddClick}>
              點擊此處新增區塊
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

export default AreaEmpty;
