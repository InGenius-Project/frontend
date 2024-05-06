import AreaEditor from '@/components/Area/AreaEditor';
import ImageCrop from '@/components/ImageCrop';
import UserProfileItem from '@/components/ProfileItem/UserProfileItem';
import { OwnerAvatar } from '@/components/UserAvatar';
import { useGetUserAreaByAreaTypeQuery } from '@/features/api/area/getUserAreaByAreaTpe';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { usePostUserMutation } from '@/features/api/user/postUser';
import { usePostBackgroundMutation } from '@/features/api/user/postUserBackground';
import { useUploadAvatarMutation } from '@/features/api/user/uploadAvatar';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { AreaType } from '@/types/enums/AreaType';
import { IImageInfo } from '@/types/interfaces/IArea';
import { AvatarPostFormData } from '@/types/interfaces/IUser';
import { Box, Stack, useTheme } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function Profile() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const profileItemRef = useRef<HTMLDivElement>(null);

  const { data: userData, isLoading: isFetchingUserData } = useGetUserQuery();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();
  const [postUser] = usePostUserMutation();
  const { data: schoolAreaData, isLoading: isFetchingEducationData } = useGetUserAreaByAreaTypeQuery(
    AreaType.Education,
  );
  const [postBackground, { isLoading: isPostingBackground }] = usePostBackgroundMutation();

  const schoolLabel = useMemo(() => {
    return schoolAreaData?.result
      ? schoolAreaData?.result
          ?.at(0)
          ?.KeyValueListLayout?.Items?.at(0)
          ?.Key?.map((a) => a.Name)
          .join(', ')
      : undefined;
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

  const handleBackgroundCropDone = useCallback(
    async (image: IImageInfo | undefined) => {
      var blob = await fetch(image?.Uri || '').then((r) => r.blob());

      postBackground({
        Image: blob,
        Uri: image?.Uri || '',
      });
    },
    [postBackground],
  );

  const { run: handleChangeUserName } = useDebounceFn((userName: string) => {
    postUser({
      Username: userName || '',
    });
  });

  return (
    <Stack spacing={1}>
      <UserProfileItem
        ref={profileItemRef}
        editable
        onChangeUserName={handleChangeUserName}
        user={userData?.result}
        education={schoolLabel ? `曾就讀於: ${schoolLabel}` : undefined}
        isLoading={isFetchingUserData || isUploadingAvatar || isFetchingEducationData || isPostingBackground}
        avatar={
          <ImageCrop
            width={150}
            height={150}
            circularCrop
            image={userData?.result?.Avatar || undefined}
            onCropDone={handleAvatarCropDone}
            altComponent={
              <Box sx={{ fontSize: '3em' }}>
                <OwnerAvatar size="150px" />
              </Box>
            }
          />
        }
        cover={
          <ImageCrop
            height={125}
            width={profileItemRef.current?.clientWidth || 0}
            image={userData?.result?.BackgroundImage || undefined}
            onCropDone={handleBackgroundCropDone}
            altComponent={
              <Box
                sx={{
                  width: '100%',
                  height: 'var(--ing-height-profile-cover)',
                  backgroundColor: theme.palette.primary.lighter,
                }}
              />
            }
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
