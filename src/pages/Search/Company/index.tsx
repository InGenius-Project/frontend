import AreaDisplayItem from '@/components/Area/AreaDisplayItem';
import AreaEmpty from '@/components/Area/AreaEmpty';
import BackButton from '@/components/Button/BackButton';
import ProfileItem from '@/components/ProfileItem';
import UserAvatar from '@/components/UserAvatar';
import { useGetUserProfileQuery } from '@/features/api/user/getUserProfile';
import { Box, Container, Divider, Paper, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

function SearchCompany() {
  const { companyId } = useParams<{ companyId: string }>();

  const { data: companyData } = useGetUserProfileQuery(companyId || '', {
    skip: !companyId || companyId === '',
  });

  return (
    <Container>
      <Stack spacing={1}>
        <Box>
          <BackButton />
        </Box>
        <Divider />
        <Stack spacing={1}>
          {/* TODO: Profile Item */}
          <ProfileItem
            user={companyData?.result}
            avatar={<UserAvatar uri={companyData?.result?.Avatar?.Uri} alt={companyData?.result?.Username} />}
          />

          {companyData && companyData.result && companyData.result.Areas && companyData.result.Areas.length > 0 ? (
            companyData.result.Areas.map((area) => (
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

export default SearchCompany;
