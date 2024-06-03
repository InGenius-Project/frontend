import AreaDisplayItem from '@/components/Area/AreaDisplayItem';
import BackButton from '@/components/Button/BackButton';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { Box, Paper, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { NIL } from 'uuid';

function ApplyResume() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { data: resumeData } = useGetResumeByIdQuery(resumeId || NIL, {
    skip: !resumeId,
  });

  return (
    <Stack spacing={1}>
      {resumeData?.result?.Areas?.map((area) => {
        return (
          <Paper sx={{ padding: 3 }} key={area.Id}>
            <AreaDisplayItem area={area} />
          </Paper>
        );
      })}
    </Stack>
  );
}

export default ApplyResume;
