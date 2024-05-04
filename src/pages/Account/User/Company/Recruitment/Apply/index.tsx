import ManageProfileEmptyItem from '@/components/ProfileItem/ManageProfileEmptyItem';
import ManageProfileItem from '@/components/ProfileItem/ManageProfileItem';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { Button, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NIL } from 'uuid';

function RecruitmentApply() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });

  const resumes = useMemo(() => {
    return recruitmentData?.result?.Resumes || [];
  }, [recruitmentData]);

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
        {resumes.length > 0 ? (
          resumes.map((r) => {
            return <ManageProfileItem resume={r} />;
          })
        ) : (
          <ManageProfileEmptyItem />
        )}
      </Stack>
    </Stack>
  );
}
export default RecruitmentApply;
