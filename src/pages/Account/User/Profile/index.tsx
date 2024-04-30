import AreaEditor from '@/components/Area/AreaEditor';
import ImageCrop from '@/components/ImageCrop';
import UserProfileItem from '@/components/ProfileItem/UserProfileItem';
import { OwnerAvatar } from '@/components/UserAvatar';
import { useGetUserAreaByAreaTypeQuery } from '@/features/api/area/getUserAreaByAreaTpe';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { usePostUserMutation } from '@/features/api/user/postUser';
import { useUploadAvatarMutation } from '@/features/api/user/uploadAvatar';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { AreaType } from '@/types/enums/AreaType';
import { IImageInfo } from '@/types/interfaces/IArea';
import { AvatarPostFormData } from '@/types/interfaces/IUser';
import { Box, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useMemo } from 'react';

export default function Profile() {
  const { data: userData } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [postUser] = usePostUserMutation();
  const { data: schoolAreaData } = useGetUserAreaByAreaTypeQuery(AreaType.Education);

  const schoolLabel = useMemo(() => {
    return schoolAreaData?.result
      ? schoolAreaData?.result
          ?.at(0)
          ?.KeyValueListLayout?.Items?.at(0)
          ?.Key?.map((a) => a.Name)
          .join(', ')
      : '';
  }, [schoolAreaData?.result]);

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

  const handleAvatarCropDone = useCallback(
    async (image: IImageInfo | undefined) => {
      if (image !== undefined) {
        const form: AvatarPostFormData = new FormData();
        let blob = await fetch(image?.Uri || '').then((r) => r.blob());
        form.append('Image', blob, image?.AltContent || 'Untitled');

        uploadAvatar(form);
      }
    },
    [uploadAvatar],
  );

  const { run: handleChangeUserName } = useDebounceFn((userName: string) => {
    postUser({
      Username: userName || '',
    });
  });

  return (
    <Stack spacing={1}>
      <UserProfileItem
        editable
        onChangeUserName={handleChangeUserName}
        user={userData?.result}
        education={`曾就讀於: ${schoolLabel}`}
        avatar={
          <ImageCrop
            circularCrop
            image={userData?.result?.Avatar || undefined}
            onCropDone={handleAvatarCropDone}
            altComponent={<OwnerAvatar />}
          />
        }
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexGrow: 1,
          gap: 1,
        }}
      >
        <AreaEditor />
      </Box>
    </Stack>
  );
}
