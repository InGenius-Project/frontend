import ManageProfileItem from '@/components/ProfileItem/ManageProfileItem';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useGetRecruitmentsQuery } from '@/features/api/recruitment/getRecruitmentsByUser';
import { Button, Stack } from '@mui/material';
import { skip } from 'node:test';
import { useParams } from 'react-router-dom';
import { NIL } from 'uuid';

function RecruitmentApply() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={1}>
        <Button>已接收</Button>
        <Button variant={'outlined'}>待審核</Button>
      </Stack>

      <Stack
        spacing={1}
        sx={{
          width: '100%',
        }}
      >
        {recruitmentData?.result?.Resumes?.map((r) => {
          return <ManageProfileItem resume={r} />;
        })}
      </Stack>
    </Stack>
  );
}
export default RecruitmentApply;
