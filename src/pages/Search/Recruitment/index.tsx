import AreaDisplayItem from '@/components/Area/AreaDisplayItem';
import AreaEmpty from '@/components/Area/AreaEmpty';
import BackButton from '@/components/Button/BackButton';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';

import { Box, Button, Container, Divider, Paper, Stack } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function SearchRecruitment() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickApply = () => {
    navigate(`/Account/User/Intern/Apply/${recruitmentId}`, {
      state: {
        from: location,
      },
    });
  };

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
              control={<Button onClick={handleClickApply}>應徵</Button>}
            />
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
