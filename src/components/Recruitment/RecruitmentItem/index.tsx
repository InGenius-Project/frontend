import { Box, Chip, IconButton, Link, Stack, useTheme } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@/features/store';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDeleteRecruitmentMutation } from '@/features/api/recruitment/deleteRecruitment';
import { UserRole } from '@/types/enums/UserRole';

type RecruitmentItemProps = {
  id: string;
  title?: string;
};

export default function RecruitmentItem({ id, title }: RecruitmentItemProps) {
  const theme = useTheme();
  const userState = useAppSelector((state) => state.userState);
  const [deleteRecruitment] = useDeleteRecruitmentMutation();

  const handleClickDelete = () => {
    deleteRecruitment(id);
  };

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
      <Typography variant="h4">{title || ''}</Typography>
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
      {(!userState || userState?.User?.Role === UserRole.Intern) && (
        <IconButton
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
      {userState.User?.Role === UserRole.Company && (
        <Stack
          direction="row"
          sx={{
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
          }}
          spacing={1}
        >
          <IconButton>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton>
            <AnalyticsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleClickDelete}>
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}
