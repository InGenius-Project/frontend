import { Box, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material';

import { IResume } from '@/types/interfaces/IResume';
import { useDebounce, useUpdateEffect } from 'ahooks';
import { addHours } from 'date-fns';
import React, { useState } from 'react';

function getLastModifiedTimeString(modifiedAt: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - modifiedAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    // If the difference is more than 24 hours, return the actual modifiedAt time
    return modifiedAt.toLocaleString();
  } else if (hours > 0) {
    return `${hours} 小時前`;
  } else if (minutes > 0) {
    return `${minutes} 分鐘前`;
  } else {
    return `${seconds} 秒前`;
  }
}

type ResumeItemProps = {
  resume: IResume;
  editable?: boolean;
  control?: React.ReactNode;
  onChangeTitle?: (title: string) => void;
  onClick?: () => void;
};

const ResumeItem = ({ resume, onChangeTitle, editable = false, control, onClick }: ResumeItemProps) => {
  const [currentTitle, setCurrentTitle] = useState<string>(resume.Title);
  const debouncedCurrentTitle = useDebounce<string>(currentTitle);

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setCurrentTitle(event.target.value);
  };

  useUpdateEffect(() => {
    onChangeTitle && onChangeTitle(debouncedCurrentTitle);
  }, [debouncedCurrentTitle]);

  return (
    <Paper
      sx={{
        padding: 2,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        <Box>
          <Stack spacing={1}>
            {editable ? (
              <TextField defaultValue={resume.Title} onChange={handleChangeTitle} />
            ) : (
              <Typography variant="subtitle1">{resume.Title} </Typography>
            )}
            <Typography variant="caption">
              上次編輯時間: {getLastModifiedTimeString(addHours(new Date(resume.ModifiedAt), 8)) || '?'}
            </Typography>
          </Stack>
        </Box>
        <Box alignSelf={'center'}>
          <Stack direction={'row'} spacing={1}>
            {control}
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export function SkeletonResumeItem() {
  return (
    <Paper
      sx={{
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        <Box>
          <Stack spacing={1}>
            <Skeleton variant="text" width={200} height={24} />
            <Skeleton variant="text" width={120} height={16} />
          </Stack>
        </Box>
        <Box alignSelf={'center'}>
          <Skeleton variant="rectangular" width={24} height={24} />
        </Box>
      </Box>
    </Paper>
  );
}

export default ResumeItem;
