import { useGetAreaTypesQuery } from '@/features/api/area/getAreaTypes';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { setAreaTypeId } from '@/features/layout/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { IAreaType } from '@/types/interfaces/IArea';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';

type AreaNewItemProps = {
  onClickNext?: () => void;
};

export default function AreaNewItem({ onClickNext }: AreaNewItemProps) {
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
      onClickNext && onClickNext();
    } else {
      selectAreaType && dispatch(setAreaTypeId(selectAreaType.Id));
      onClickNext && onClickNext();
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
        {areaTypesData?.result && (
          <Autocomplete
            size="small"
            options={areaTypesData.result}
            value={selectAreaType || null}
            getOptionLabel={(option) => option.Name}
            onChange={(e: any, value) => setSelectAreaType(value)}
            sx={{ flex: '1 1 auto' }}
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
    </Stack>
  );
}
