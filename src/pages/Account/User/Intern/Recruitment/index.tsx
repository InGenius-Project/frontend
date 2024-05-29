import ApplyButton from '@/components/Button/ApplyButton';
import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmpty';
import { InternRecruitmentItem, SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetFavRecruitmentQuery } from '@/features/api/user/getFavRecruitments';
import { Chip, IconButton, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function InternRecruitment() {
  const { data: recruitmentData, isLoading } = useGetFavRecruitmentQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

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
              onClick={() =>
                navigate(`/Search/Recruitment/${r.Id}`, {
                  state: {
                    from: location,
                  },
                })
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
