import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmptyItem';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetFavRecruitmentQuery } from '@/features/api/user/getFavRecruitments';
import { Stack } from '@mui/material';

function InternRecruitment() {
  const { data: recruitmentData } = useGetFavRecruitmentQuery();

  return (
    <>
      <Stack>
        {recruitmentData && recruitmentData.result && recruitmentData.result.length > 0 ? (
          recruitmentData.result.map((r) => <InternRecruitmentItem recruitment={r} />)
        ) : (
          <RecruitmentEmptyItem />
        )}
      </Stack>
    </>
  );
}

export default InternRecruitment;
