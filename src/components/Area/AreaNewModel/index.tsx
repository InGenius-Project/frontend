import { useGetAreaTypesQuery } from '@/features/api/area/getAreaTypes';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { initializeState, setAreaTypeId } from '@/features/layout/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { IAreaType } from '@/types/interfaces/IArea';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Chip, Divider, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AreaNewModel() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { data: userData, isSuccess: isGettingUserSuccess } = useGetUserQuery(null);
  const { data: areaTypesData } = useGetAreaTypesQuery(
    {
      roles: userData?.result?.Role !== undefined ? [userData.result.Role] : undefined,
    },
    {
      skip: !isGettingUserSuccess,
    },
  );

  const [selectAreaType, setSelectAreaType] = useState<IAreaType | null>();
  const { areaTypeId: areaType } = useAppSelector((state) => state.layoutState);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!selectAreaType) {
      confirm({
        title: '尚未選擇預設類型，確定要繼續?',
        description: '您尚未選擇預設的類型，若選擇繼續，會以自定義的方式繼續新增區塊',
        confirmationText: '以自定義的類型繼續',
        cancellationText: '取消',
        cancellationButtonProps: {
          variant: 'outlined',
        },
      })
        .then(() => {
          handleCustomClick();
        })
        .catch(() => {});
    } else {
      selectAreaType && dispatch(setAreaTypeId(selectAreaType.Id));
      navigate(`../Area`);
    }
  };

  const handleCustomClick = () => {
    dispatch(initializeState());
    navigate(`../Layout`);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="h4">新增區塊</Typography>
          <Typography variant="caption">預設內容類型</Typography>
          <Divider />
        </Stack>

        <Stack spacing={2}>
          <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
            {areaTypesData?.result && (
              <Autocomplete
                size="small"
                options={areaTypesData.result}
                value={selectAreaType || null}
                getOptionLabel={(option) => option.Name}
                onChange={(e: any, value) => setSelectAreaType(value)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="查詢區塊類型"
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
              />
            )}
            <Box>
              <Button variant="outlined" onClick={handleCustomClick}>
                自定義
              </Button>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems={'center'}>
            <Typography variant="body1">預設類型</Typography>
            {areaTypesData?.result &&
              areaTypesData.result.map((o: any, i: any) => (
                <Chip
                  key={i}
                  icon={areaType && o.Id === areaType ? <CheckIcon /> : <AddIcon />}
                  label={o.Name}
                  onClick={() => {
                    setSelectAreaType(o);
                  }}
                />
              ))}
          </Stack>
          <Box>
            <Button onClick={handleClick}>下一步</Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
