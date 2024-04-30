import Certificate from '@/assets/images/svg/certificate.svg?react';
import { usePostAreaMutation, usePostListLayoutMutation } from '@/features/api/area';
import { useGetUserAreaByAreaTypeQuery } from '@/features/api/area/getUserAreaByAreaTpe';
import { useGetTagsQuery } from '@/features/api/tag/getTags';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { AreasType, setAreaType } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { AreaType } from '@/types/enums/AreaType';
import { TagType } from '@/types/enums/TagType';
import { ITag } from '@/types/interfaces/ITag';
import { Autocomplete, Box, Button, Stack, TextField, Typography, createFilterOptions } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';

const filter = createFilterOptions<ITag>();

function InitSkill() {
  const dispatch = useAppDispatch();

  const { data: userData } = useGetUserQuery();
  const { data: skillTagsData } = useGetTagsQuery([TagType.Skill]);
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
            Items: selectSkillState,
          })
            .unwrap()
            .then(() => {
              navigate('/Account/User');
            });
        }
      });
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{
        py: '2em',
      }}
    >
      <Grid mobile={12} tablet={6}>
        <Stack spacing={1}>
          <Typography variant="h2">你的技能</Typography>
          <Typography variant="caption">選擇你的技能，讓我們提供更精確的實習給你</Typography>
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
          <Typography color="error">請至少選擇一項技能</Typography>
          <Box>
            <Button onClick={handleClickFinish}>完成</Button>
          </Box>
        </Stack>
      </Grid>
      <Grid
        mobile={12}
        tablet={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Certificate
          style={{
            width: '40%',
            height: 'auto',
          }}
        />
      </Grid>
    </Grid>
  );
}

export default InitSkill;
