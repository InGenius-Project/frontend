import UserAvatar from '@/components/UserAvatar';
import { IOwnerRecruitment } from '@/types/interfaces/IRecruitment';
import TagIcon from '@mui/icons-material/Tag';
import { Avatar, Box, Chip, Link, Stack, TextField, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';

type RecruitmentItemProps = {
  control?: React.ReactNode;
  editable?: boolean;
  recruitment: IOwnerRecruitment;
  onChange?: (recruitment: IOwnerRecruitment) => void;
};

export default function RecruitmentItem({ control, editable, recruitment, onChange }: RecruitmentItemProps) {
  const theme = useTheme();
  const [titleState, setTitleState] = useState(recruitment.Name || '');

  useUpdateEffect(() => {
    onChange && onChange({ ...recruitment, Name: titleState });
  }, [onChange, titleState]);

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
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Box sx={{ width: '2em', height: '2em' }}>
          <UserAvatar uri={recruitment.Publisher?.Avatar?.Uri} alt={recruitment.Publisher?.Username} />
        </Box>

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
            <Typography variant="subtitle1">{recruitment.Name || ''}</Typography>
          )}
        </Box>
        <Box>{control}</Box>
      </Stack>
      <Stack spacing={1} direction={'row'} alignItems={'baseline'}>
        <Link href="" color={theme.palette.info.main}>
          {recruitment.Publisher?.Username || '未知使用者'}
        </Link>
        <Typography variant="caption"> | </Typography>
        {/* TODO: Location  */}
        <Typography variant="caption">台北市</Typography>
      </Stack>
      <Stack spacing={1} direction={'row'}>
        <Chip label={'社群管理'} color="primary" icon={<TagIcon />} />
      </Stack>
    </Stack>
  );
}
