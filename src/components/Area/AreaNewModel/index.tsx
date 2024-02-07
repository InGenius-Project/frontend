import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetAreaTypesQuery } from "features/api/area/getAreaTypes";
import { useGetUserQuery } from "features/api/user/getUser";
import {
  initializeStateWithoutFocusedArea,
  setAreaType,
} from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";

const areaOptions = ["簡介", "專業技能", "教育背景"];

export default function AreaNewModel() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { data: userData } = useGetUserQuery(null);
  const { data: areaTypesData } = useGetAreaTypesQuery(
    {
      userRoles: userData?.result?.Role ? [userData?.result?.Role] : undefined,
    },
    {
      skip: !userData, // prefetch user data
    }
  );

  const { areaType } = useAppSelector((state) => state.layoutState);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!areaType) {
      confirm({
        title: "尚未選擇預設類型，確定要繼續?",
        description:
          "您尚未選擇預設的類型，若選擇繼續，會以自定義的方式繼續新增區塊",
        confirmationText: "以自定義的類型繼續",
        cancellationText: "取消",
        cancellationButtonProps: {
          variant: "outlined",
        },
      })
        .then(() => {
          handleCustomClick();
        })
        .catch(() => {});
    } else {
      navigate(`../Area`);
    }
  };

  const handleCustomClick = () => {
    dispatch(initializeStateWithoutFocusedArea());
    navigate(`../Layout`);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">選擇類型</Typography>
      <Typography variant="caption">
        使用預設的內容類型，讓你的主頁更加美觀，並且讓企業更容易依據內容搜尋到你的資訊!
      </Typography>

      <Stack spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"flex-end"}>
          {areaTypesData?.result && (
            <Autocomplete
              options={areaTypesData.result}
              value={areaType || null}
              getOptionLabel={(option) => option.Name}
              onChange={(e: any, value) => dispatch(setAreaType(value))}
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

        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography variant="body1">常見類型</Typography>
          {areaTypesData?.result &&
            areaTypesData.result.map((o, i) => (
              <Chip
                key={i}
                icon={areaType && o === areaType ? <CheckIcon /> : <AddIcon />}
                label={o.Name}
                onClick={() => {
                  dispatch(setAreaType(o));
                }}
              />
            ))}
        </Stack>
        <Box>
          <Button onClick={handleClick}>下一步</Button>
        </Box>
      </Stack>
    </Stack>
  );
}
