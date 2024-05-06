import ApplyButton from '@/components/Button/ApplyButton';
import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmpty';
import { InternRecruitmentItem, SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetFavRecruitmentQuery } from '@/features/api/user/getFavRecruitments';
import { Chip, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function InternRecruitment() {
  const { data: recruitmentData, isLoading } = useGetFavRecruitmentQuery();

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickRecruitmentSearch = () => {};

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
              control={
                (r.Resumes || []).length === 0 ? (
                  <ApplyButton recruitmentId={r.Id} />
                ) : (
                  <Chip label={`已應徵`} onClick={handleClickRecruitmentSearch} />
                )
              }
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
