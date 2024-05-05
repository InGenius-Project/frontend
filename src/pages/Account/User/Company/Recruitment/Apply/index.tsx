import ManageProfileEmptyItem from '@/components/ProfileItem/ManageProfileEmptyItem';
import ManageProfileItem from '@/components/ProfileItem/ManageProfileItem';
import { useLazyAnalyzeApplyedResumeQuery } from '@/features/api/recruitment/analyzeApplyedResume';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSearchRelativeResumesQuery } from '@/features/api/recruitment/searchRelativeResume';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NIL } from 'uuid';

function RecruitmentApply() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });
  const [analyzeApplyedResume] = useLazyAnalyzeApplyedResumeQuery();

  const { data: searchRelativResume } = useSearchRelativeResumesQuery({
    recruitmentId: recruitmentId || NIL,
    searchAll: false,
  });

  const resumes = useMemo(() => {
    return recruitmentData?.result?.Resumes || [];
  }, [recruitmentData]);

  const relativeResumes = useMemo(() => {
    return searchRelativResume?.result || [];
  }, [searchRelativResume?.result]);

  const handleAnalyze = () => {
    if (recruitmentId && relativeResumes.length === 0)
      analyzeApplyedResume({
        recruitmentId: recruitmentId || NIL,
      })
        .unwrap()
        .then(() => {
          handleNavigateRelative();
        });
    else {
      handleNavigateRelative();
    }
  };

  const handleNavigateRelative = () => {
    navigate(`/Search/Relative/Resume/${recruitmentId}`, {
      state: {
        from: location,
      },
    });
  };

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={1}>
        <LoadingButton variant="contained" onClick={handleAnalyze} startIcon={<AutoAwesome />}>
          一鍵分析履歷
        </LoadingButton>

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
