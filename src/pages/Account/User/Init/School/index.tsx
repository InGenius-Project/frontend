import AnalyzeSvg from '@/assets/images/svg/analyze.svg?react';
import { usePostAreaMutation, usePostKeyValueListLayoutMutation } from '@/features/api/area';
import { useGetUserAreaByAreaTypeQuery } from '@/features/api/area/getUserAreaByAreaTpe';
import { useGetTagsQuery } from '@/features/api/tag/getTags';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { AreasType, setAreaType } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { AreaType } from '@/types/enums/AreaType';
import { TagType } from '@/types/enums/TagType';
import { ITag } from '@/types/interfaces/ITag';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';

const filter = createFilterOptions<ITag>();

enum SchoolStep {
  University,
  Department,
}

function InitSchool() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [stepState, setStepState] = useState<SchoolStep>(SchoolStep.University);
  const [schoolState, setSchoolState] = useState<ITag | null>(null);
  const [departmentState, setDepartmentState] = useState<ITag | null>(null);
  const [yearState, setYearState] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [postKeyValueListLayout] = usePostKeyValueListLayoutMutation();
  const { data: userData } = useGetUserQuery();
  const [postArea] = usePostAreaMutation();
  const { data: departmentData } = useGetTagsQuery([TagType.Department]);
  const { data: universityData } = useGetTagsQuery([TagType.University]);
  const { data: educationData } = useGetUserAreaByAreaTypeQuery(AreaType.Education);

  useEffect(() => {
    if ((educationData?.result || []).length > 0) {
      navigate('/Account/User/Init/Skill');
    }
  }, [educationData?.result, educationData?.result?.length, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickNext = () => {
    if (!departmentState || !yearState || !schoolState || error) {
      setError(true);
      return;
    }

    dispatch(setAreaType(AreasType.PROFILE));
    postArea({
      Id: NIL,
      UserId: userData?.result?.Id,
      AreaTypeId: AreaType.Education,
      Sequence: 0,
      IsDisplayed: true,
      Title: '',
    })
      .unwrap()
      .then((res) => {
        if (res.result?.Id) {
          postKeyValueListLayout({
            AreaId: res.result?.Id || NIL,
            Items: [
              {
                Id: NIL,
                TagIds: [schoolState.Id, departmentState.Id],
                Value: yearState || '',
              },
            ],
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
        {stepState === SchoolStep.University && (
          <Stack spacing={1}>
            <Typography variant="h2">你的學校</Typography>
            <Typography variant="caption">選擇你的學校，讓我們提供更精確的實習給你</Typography>
            {universityData?.result && (
              <Autocomplete
                onChange={(_, tag) => {
                  setSchoolState(tag);
                  setError(false);
                }}
                options={universityData.result}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
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
            {error && <Typography color="error">請選擇學校</Typography>}
            <Box>
              <Button
                onClick={() => {
                  if (!schoolState) {
                    setError(true);
                    return;
                  }
                  setStepState(SchoolStep.Department);
                }}
              >
                下一步
              </Button>
            </Box>
          </Stack>
        )}
        {stepState === SchoolStep.Department && (
          <Stack spacing={1}>
            <Typography variant="h2">你的科系</Typography>
            <Typography variant="caption">選擇你的科系，讓我們提供更精確的實習給你</Typography>
            {departmentData?.result && (
              <Stack direction={'row'}>
                <Autocomplete
                  sx={{
                    flex: '1 1 auto',
                  }}
                  onChange={(_, tag) => {
                    setDepartmentState(tag);
                    document.getElementById('init-school-year')?.focus();
                    handleOpen();
                  }}
                  options={departmentData.result}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  getOptionLabel={(option) => option.Name}
                  isOptionEqualToValue={(option, value) => {
                    return option.Id === value.Id;
                  }}
                  handleHomeEndKeys
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    return filtered;
                  }}
                />
                <FormControl
                  sx={{
                    flex: '1 1 2.5em',
                  }}
                >
                  <InputLabel>年級</InputLabel>
                  <Select
                    value={yearState}
                    id="init-school-year"
                    onChange={(e) => setYearState(e.target.value)}
                    placeholder="年級"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                  >
                    <MenuItem value="大一">大一</MenuItem>
                    <MenuItem value="大二">大二</MenuItem>
                    <MenuItem value="大三">大三</MenuItem>
                    <MenuItem value="大四">大四</MenuItem>
                    <MenuItem value="大五">大五</MenuItem>
                    <MenuItem value="大六">大六</MenuItem>
                    <MenuItem value="研究生">研究生</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}
            {error && <Typography color="error">請選擇科系與年級</Typography>}

            <Stack direction="row" spacing={1}>
              <Button onClick={() => setStepState(SchoolStep.University)} variant="outlined">
                上一步
              </Button>
              <Button onClick={handleClickNext}>下一步</Button>
            </Stack>
          </Stack>
        )}
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
        <AnalyzeSvg
          style={{
            width: '60%',
            height: 'auto',
          }}
        />
      </Grid>
    </Grid>
  );
}

export default InitSchool;
