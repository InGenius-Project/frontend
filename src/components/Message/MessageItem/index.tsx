import getTimeDiffer from '@/assets/utils/getTimeDiffer';
import RichTextEditor from '@/components/RichTextEditor';
import { Avatar, Box, Chip, Typography, useTheme } from '@mui/material';
import React from 'react';

interface MessageItemProps {
  align?: 'left' | 'right';
  label: string;
  avatar?: React.ReactNode;
  time?: string;
}

function MessageItem({ align = 'left', label, avatar, time }: MessageItemProps) {
  const theme = useTheme();

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
        {avatar ? (
          <Box sx={{ width: '1.5em', height: '1.5em' }}>{avatar}</Box>
        ) : (
          <Avatar sx={{ width: '1.5em', height: '1.5em' }}></Avatar>
        )}
      </Box>
      <Chip
        label={
          align === 'left' ? (
            <RichTextEditor initMarkdownString={label} />
          ) : (
            <Typography
              variant={'body1'}
              sx={{
                color: theme.palette.common.white,
                p: 1,
              }}
            >
              {label}{' '}
            </Typography>
          )
        }
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
        color={align === 'left' ? 'default' : 'primary'}
      />
      <Typography variant={'caption'}>{time ? getTimeDiffer(time) : ''}</Typography>
    </Box>
  );
}

export default MessageItem;
