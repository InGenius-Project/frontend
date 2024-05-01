import AreaDisplayItem from '@/components/Area/AreaDisplayItem';
import AreaEmpty from '@/components/Area/AreaEmpty';
import ApplyButton from '@/components/Button/ApplyButton';
import BackButton from '@/components/Button/BackButton';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useGetSaftyReportQuery } from '@/features/api/recruitment/getSaftyReport';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function SearchRecruitment() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: saftyReportData } = useGetSaftyReportQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });

  return (
    <Container>
      <Stack spacing={1}>
        <Box>
          <BackButton />
        </Box>
        <Divider />
        <Stack spacing={1}>
          {recruitmentData?.result && (
            <InternRecruitmentItem
              recruitment={recruitmentData?.result}
              control={<ApplyButton recruitmentId={recruitmentId || ''} />}
            />
          )}
          {saftyReportData?.result && (
            <Paper sx={{ padding: 3 }}>
              <Box>
                <Typography variant="subtitle1">安全報告</Typography>
                <Typography variant="body1">{saftyReportData.result.Content}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">平均薪資</Typography>
                <Typography variant="body1">{saftyReportData.result.AverageSalary}</Typography>
              </Box>
            </Paper>
          )}
          {recruitmentData &&
          recruitmentData.result &&
          recruitmentData.result.Areas &&
          recruitmentData.result.Areas.length > 0 ? (
            recruitmentData.result.Areas.map((area) => (
              <Paper sx={{ padding: 3 }} key={area.Id}>
                <AreaDisplayItem area={area} />
              </Paper>
            ))
          ) : (
            <AreaEmpty />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default SearchRecruitment;
