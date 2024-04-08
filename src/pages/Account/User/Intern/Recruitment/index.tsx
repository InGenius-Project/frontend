import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmptyItem';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetFavRecruitmentQuery } from '@/features/api/user/getFavRecruitments';
import { Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function InternRecruitment() {
  const { data: recruitmentData } = useGetFavRecruitmentQuery();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Stack spacing={1}>
        {recruitmentData && recruitmentData.result && recruitmentData.result.length > 0 ? (
          recruitmentData.result.map((r) => (
            <InternRecruitmentItem
              recruitment={r}
              onClick={() => {
                navigate(`/Search/Recruitment/${r.Id}`, {
                  state: {
                    from: location,
                  },
                });
              }}
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
