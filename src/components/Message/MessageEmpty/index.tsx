import { Box, Chip } from '@mui/material';
import React from 'react';

type MessageEmptyProps = {
  label?: string;
};

function MessageEmpty({ label }: MessageEmptyProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {label ? (
        <Chip
          label={label}
          sx={{
            height: 'fit-content',
            p: 1,
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            },
          }}
        />
      ) : (
        <Chip label="這裡是此聊天室的開頭" />
      )}
    </Box>
  );
}

export default MessageEmpty;
