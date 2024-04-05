import { IRecruitmentPost } from '@/types/interfaces/IRecruitment';

import TagIcon from '@mui/icons-material/Tag';
import { Box, Chip, Link, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

type RecruitmentItemProps = {
  id: string;
  title?: string;
  onPost?: (recruitment: IRecruitmentPost) => void;
  control?: React.ReactNode;
};

export default function RecruitmentItem({ id, title, onPost, control }: RecruitmentItemProps) {
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
      <Box
        sx={{
          position: 'absolute',
          top: theme.spacing(1),
          right: theme.spacing(1),
        }}
      >
        {control}
      </Box>
    </Stack>
  );
}
