import TagIcon from '@mui/icons-material/Tag';
import { Box, Chip, Link, Stack, TextField, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDebounce, useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';

type RecruitmentItemProps = {
  id: string;
  title?: string;
  control?: React.ReactNode;
  editable?: boolean;
  onChangeTitle?: (title: string) => void;
};

export default function RecruitmentItem({ id, title, control, editable, onChangeTitle }: RecruitmentItemProps) {
  const theme = useTheme();
  const [titleState, setTitleState] = useState(title || '');

  useUpdateEffect(() => {
    onChangeTitle && onChangeTitle(titleState);
  }, [onChangeTitle, titleState]);

  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: theme.palette.common.white,
        position: 'relative',
        borderRadius: 'var(--ing-borderRadius-sm)',
        padding: theme.spacing(2),
      }}
    >
      <Stack direction={'row'} spacing={1}>
        <Box sx={{ flex: '1 1 auto' }}>
          {editable ? (
            <TextField
              label="職缺名稱"
              fullWidth
              value={titleState}
              onChange={(e) => {
                setTitleState(e.target.value);
              }}
            />
          ) : (
            <Typography variant="subtitle1">{title || ''}</Typography>
          )}
        </Box>
        <Box sx={{}}>{control}</Box>
      </Stack>
      <Box>
        <Link href="#" color={theme.palette.info.main}>
          網路股份有限公司
        </Link>
        <Typography variant="caption"> | </Typography>
        <Typography variant="caption">台北市南港區</Typography>
      </Box>
      <Stack spacing={1} direction={'row'}>
        <Chip label={'社群管理'} color="primary" icon={<TagIcon />} />
      </Stack>
    </Stack>
  );
}
