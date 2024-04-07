import UserAvatar from '@/components/UserAvatar';
import { IRecruitment } from '@/types/interfaces/IRecruitment';
import TagIcon from '@mui/icons-material/Tag';
import { Box, Chip, Link, Stack, TextField, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import { useRemoveFavRecruitmentMutation } from '@/features/api/user/removeFavRecruitment';
import { useAddFavRecruitmentMutation } from '@/features/api/user/addFavRecruitment';

type RecruitmentItemProps = {
  control?: React.ReactNode;
  editable?: boolean;
  recruitment: IRecruitment;
  onChange?: (recruitment: IRecruitment) => void;
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

export function InternRecruitmentItem({ editable, recruitment }: Omit<RecruitmentItemProps, 'control' | 'onChange'>) {
  // TODO :init checked
  const [checked, setChecked] = useState(false);

  const [removeFavRecruitment] = useRemoveFavRecruitmentMutation();
  const [addFavRecruitment] = useAddFavRecruitmentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addFavRecruitment([recruitment.Id]);
    } else {
      removeFavRecruitment([recruitment.Id]);
    }
  };

  return (
    <RecruitmentItem
      recruitment={recruitment}
      editable={editable}
      control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={handleChange} />}
    />
  );
}
