import Certificate from '@/assets/images/svg/certificate.svg?react';
import InitContainer from '@/components/InitContainer';
import { usePostAreaMutation, usePostListLayoutMutation } from '@/features/api/area';
import { useGetUserAreaByAreaTypeQuery } from '@/features/api/area/getUserAreaByAreaTpe';
import { useGetTagsQuery } from '@/features/api/tag/getTags';
import { getUserApi, useGetUserQuery } from '@/features/api/user/getUser';
import { AreasType, setAreaType } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { AreaType } from '@/types/enums/AreaType';
import { TagType } from '@/types/enums/TagType';
import { ITag } from '@/types/interfaces/ITag';
import { Autocomplete, Box, Button, Skeleton, Stack, TextField, Typography, createFilterOptions } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';

const filter = createFilterOptions<ITag>();

function InitSkill() {
  const dispatch = useAppDispatch();

  const { data: userData } = useGetUserQuery();
  const { data: skillTagsData, isLoading: isFetchingSkillTag } = useGetTagsQuery([TagType.Skill]);
  const [selectSkillState, setSelectSkillState] = useState<ITag[]>([]);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const [postArea] = usePostAreaMutation();
  const [postListLayout] = usePostListLayoutMutation();
  const { data: skillAreaData } = useGetUserAreaByAreaTypeQuery(AreaType.Skill);

  useEffect(() => {
    if ((skillAreaData?.result || []).length > 0) {
      navigate('/Account/User');
    }
  }, [navigate, skillAreaData?.result]);

  const handleClickFinish = () => {
    if (!selectSkillState || selectSkillState.length <= 0 || error) {
      setError(true);
      return;
    }

    dispatch(setAreaType(AreasType.PROFILE));
    postArea({
      Id: NIL,
      UserId: userData?.result?.Id,
      AreaTypeId: AreaType.Skill,
      Sequence: 0,
      IsDisplayed: true,
      Title: '',
    })
      .unwrap()
      .then((res) => {
        if (res.result?.Id) {
          postListLayout({
            AreaId: res.result?.Id || NIL,
            Items: selectSkillState.map((i) => ({
              Id: i.Id,
              Name: i.Name,
              TagTypeId: i.Type.Id,
            })),
          })
            .unwrap()
            .then(() => {
              // TODO: remove below line for better solution
              dispatch(getUserApi.util.resetApiState());

              navigate('/Account/User');
            });
        }
      });
  };

  return (
    <InitContainer
      leftComponent={
        <Stack spacing={1}>
          <Typography variant="h2">你的技能</Typography>
          <Typography variant="caption">選擇你的技能，讓我們提供更精確的實習給你</Typography>
          {isFetchingSkillTag && <Skeleton width="100%" height="5em" />}

          {skillTagsData?.result && (
            <Autocomplete
              multiple
              onChange={(_, tag) => {
                setSelectSkillState(tag);
                setError(false);
              }}
              options={skillTagsData.result}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(option) => option.Name}
              isOptionEqualToValue={(option, value) => {
                return option.Id === value.Id;
              }}
              selectOnFocus
              handleHomeEndKeys
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
              }}
            />
          )}
          {error && <Typography color="error">請至少選擇一項技能</Typography>}
          <Box>
            <Button onClick={handleClickFinish}>完成</Button>
          </Box>
        </Stack>
      }
      rightComponent={
        <Certificate
          style={{
            width: '100%',
          }}
        />
      }
    />
  );
}

export default InitSkill;
