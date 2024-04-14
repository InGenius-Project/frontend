import ApplyButton from '@/components/Button/ApplyButton';
import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmptyItem';
import { InternRecruitmentItem, SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetFavRecruitmentQuery } from '@/features/api/user/getFavRecruitments';
import { Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function InternRecruitment() {
  const { data: recruitmentData, isLoading } = useGetFavRecruitmentQuery();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Stack spacing={1}>
        {isLoading && Array.from({ length: 5 }).map((_, index) => <SkeletonRecruitmentItem key={index} />)}
        {recruitmentData && recruitmentData.result && recruitmentData.result.length > 0 ? (
          recruitmentData.result.map((r) => (
            <InternRecruitmentItem
              key={r.Id}
              recruitment={r}
              onClick={() => {
                navigate(`/Search/Recruitment/${r.Id}`, {
                  state: {
                    from: location,
                  },
                });
              }}
              control={<ApplyButton recruitmentId={r.Id} />}
            />
          ))
        ) : (
          <RecruitmentEmptyItem />
        )}
      </Stack>
    </>
  );
}

export default InternRecruitment;
