import { Box, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material';

import getTimeDiffer from '@/assets/utils/getTimeDiffer';
import { IResume } from '@/types/interfaces/IResume';
import { useDebounce, useUpdateEffect } from 'ahooks';
import React, { useState } from 'react';

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
            <Typography variant="caption">上次編輯時間: {getTimeDiffer(resume.ModifiedAt) || '?'}</Typography>
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
