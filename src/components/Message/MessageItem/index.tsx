import { Avatar, Box, Chip, Typography } from '@mui/material';
import React from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface MessageItemProps {
  align: 'left' | 'right';
  label: string;
}

function MessageItem({ align, label }: MessageItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        maxWidth: '30em',
        alignItems: 'flex-end',
        alignSelf: align === 'left' ? 'flex-start' : 'flex-end',
        flexDirection: align === 'left' ? 'row' : 'row-reverse',
      }}
    >
      <Box
        sx={{
          height: '100%',
          alignSelf: 'center',
        }}
      >
        {align === 'left' ? (
          <Avatar>
            <SmartToyIcon />{' '}
          </Avatar>
        ) : (
          <Avatar sx={{ width: '1.5em', height: '1.5em' }}></Avatar>
        )}
      </Box>
      <Chip
        label={label}
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
          p: 1,
        }}
        color={align === 'left' ? 'default' : 'primary'}
      />
      {/* <Typography variant={'caption'}>19:30</Typography> */}
    </Box>
  );
}

export default MessageItem;
