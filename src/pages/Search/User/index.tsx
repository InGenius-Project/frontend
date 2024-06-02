import AreaDisplayItem from '@/components/Area/AreaDisplayItem';
import AreaEmpty from '@/components/Area/AreaEmpty';
import BackButton from '@/components/Button/BackButton';
import UserProfileItem from '@/components/ProfileItem/UserProfileItem';
import UserAvatar from '@/components/UserAvatar';
import { useGetUserProfileQuery } from '@/features/api/user/getUserProfile';
import { Box, Container, Divider, Paper, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

function SearchUser() {
  const { userId } = useParams<{ userId: string }>();

  const { data: userData, isLoading } = useGetUserProfileQuery(userId || '', {
    skip: !userId || userId === '',
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
          <UserProfileItem
            isLoading={isLoading}
            user={userData?.result}
            avatar={<UserAvatar uri={userData?.result?.Avatar?.Uri} alt={userData?.result?.Username} />}
          />

          {userData && userData.result && userData.result.Areas && userData.result.Areas.length > 0 ? (
            userData.result.Areas.map((area) => (
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

export default SearchUser;
