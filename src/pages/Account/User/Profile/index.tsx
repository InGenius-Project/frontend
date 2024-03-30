import AreaEditor from '@/components/Area/AreaEditor';
import ProfileItem from '@/components/ProfileItem';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { usePostUserMutation } from '@/features/api/user/postUser';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { IArea } from '@/types/interfaces/IArea';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';

export default function Profile() {
  const { data: userData } = useGetUserQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData && userData.result) {
      dispatch(
        setAreas({
          id: userData.result?.Id,
          type: AreasType.PROFILE,
          areas: userData?.result?.Areas || [],
        }),
      );
    }
  }, [dispatch, userData]);

  const [postUser] = usePostUserMutation();

  const handlePostProfileArea = async (areas: Array<IArea>) => {
    await postUser({
      Username: userData?.result?.Username || '',
      Areas: areas.map((area) => ({
        Id: area.Id,
        Sequence: area.Sequence,
        IsDisplayed: area.IsDisplayed,
        Title: area.Title,
        LayoutType: area.LayoutType,
        AreaTypeId: area.AreaTypeId,
      })),
    });
  };

  return (
    <Stack spacing={1}>
      <ProfileItem editable />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexGrow: 1,
          gap: 1,
        }}
      >
        <AreaEditor onPost={handlePostProfileArea}></AreaEditor>
      </Box>
    </Stack>
  );
}
