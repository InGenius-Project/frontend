import BackButton from '@/components/Button/BackButton';
import RecruitmentEmpty from '@/components/Recruitment/RecruitmentEmpty';
import { ResumeItem } from '@/components/Resume';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSearchRelativeResumesQuery } from '@/features/api/recruitment/searchRelativeResume';
import { Box, Chip, Container, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { NIL } from 'uuid';

function SearchResumeRelative() {
  const { recruitmentId } = useParams();

  const [params] = useSearchParams();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });
  const theme = useTheme();

  const { data: relativeResumesData } = useSearchRelativeResumesQuery(
    {
      recruitmentId: recruitmentId || NIL,
      searchAll: false,
    },
    {
      skip: !recruitmentId,
    },
  );

  const { data: allRelativeResumesData } = useSearchRelativeResumesQuery(
    {
      recruitmentId: recruitmentId || NIL,
      searchAll: true,
    },
    {
      skip: !recruitmentId,
    },
  );

  return (
    <Container>
      <Stack spacing={1}>
        <Box>
          <BackButton />
        </Box>
        <Typography variant="h5">
          與{' '}
          <Chip
            label={recruitmentData?.result?.Name}
            sx={{
              fontSize: theme.typography.h5.fontSize,
            }}
          />{' '}
          相關的履歷
        </Typography>

        <Divider />

        <Typography variant="h5">已應徵的履歷</Typography>
        <Stack spacing={1}>
          {relativeResumesData?.result && relativeResumesData.result.length > 0 ? (
            <>{relativeResumesData?.result.map((r) => <ResumeItem key={r.Id} resume={r} />)}</>
          ) : (
            <RecruitmentEmpty />
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="h5">與這份職缺相似的履歷</Typography>
          <Chip label="Pro" avatar={<StarIcon />} />
        </Stack>
        {allRelativeResumesData?.result && allRelativeResumesData.result.length > 0 ? (
          <>{allRelativeResumesData?.result.map((r) => <ResumeItem key={r.Id} resume={r} />)}</>
        ) : (
          <RecruitmentEmpty />
        )}
      </Stack>
    </Container>
  );
}

export default SearchResumeRelative;
