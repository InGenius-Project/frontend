import UserAvatar from '@/components/UserAvatar';
import { useAddFavRecruitmentMutation } from '@/features/api/user/addFavRecruitment';
import { useRemoveFavRecruitmentMutation } from '@/features/api/user/removeFavRecruitment';
import { IRecruitment } from '@/types/interfaces/IRecruitment';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import TagIcon from '@mui/icons-material/Tag';
import { Box, Chip, Link, Skeleton, Stack, TextField, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

type RecruitmentItemProps = {
  control?: React.ReactNode;
  editable?: boolean;
  recruitment: IRecruitment;
  onChange?: (recruitment: IRecruitment) => void;
};

export default function RecruitmentItem({ control, editable, recruitment, onChange }: RecruitmentItemProps) {
  const theme = useTheme();
  const location = useLocation();
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
        '&:hover': {
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
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
      <Stack
        spacing={1}
        direction={'row'}
        alignItems={'baseline'}
        onClick={(e) => e.stopPropagation()}
        width={'fit-content'}
      >
        <Link
          component={RouterLink}
          to={`/Search/Company/${recruitment.Publisher?.Id}`}
          color={theme.palette.info.main}
          state={{
            from: location,
          }}
        >
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

type InternRecruitmentItemProps = {
  onClick?: () => void;
} & Omit<RecruitmentItemProps, 'onChange'>;

export function InternRecruitmentItem({ editable, recruitment, onClick, control }: InternRecruitmentItemProps) {
  const [checked, setChecked] = useState(recruitment.IsUserFav || false);

  const [removeFavRecruitment] = useRemoveFavRecruitmentMutation();
  const [addFavRecruitment] = useAddFavRecruitmentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      addFavRecruitment([recruitment.Id]);
    } else {
      removeFavRecruitment([recruitment.Id]);
    }
  };
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick && onClick();
  };

  return (
    <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <RecruitmentItem
        recruitment={recruitment}
        editable={editable}
        control={
          <Stack spacing={1} direction={'row'} onClick={(e) => e.stopPropagation()}>
            <Checkbox icon={<FavoriteBorder />} checked={checked} checkedIcon={<Favorite />} onChange={handleChange} />
            {control}
          </Stack>
        }
      />
    </Box>
  );
}

export function SkeletonRecruitmentItem() {
  const theme = useTheme();
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
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Box sx={{ width: '2em', height: '2em' }}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>

        <Box sx={{ flex: '1 1 auto' }}>
          <Skeleton variant="text" width={200} />
        </Box>
        <Box>
          <Skeleton variant="rectangular" width={24} height={24} />
        </Box>
      </Stack>
      <Stack spacing={1} direction={'row'} alignItems={'baseline'}>
        <Skeleton variant="text" width={100} />
        <Typography variant="caption"> | </Typography>
        <Skeleton variant="text" width={100} />
      </Stack>
      <Stack spacing={1} direction={'row'}>
        <Skeleton>
          <Chip />
        </Skeleton>
      </Stack>
    </Stack>
  );
}
