import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
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
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

interface AreaType {
  value: string;
  type: string;
}

const options = [
  {
    value: "簡介",
    type: "user",
  },
  {
    value: "教育背景",
    type: "user",
  },
  {
    value: "專業技能",
    type: "user",
  },
  {
    value: "聯絡資訊",
    type: "user",
  },
];

export default function New() {
  const [value, setValue] = React.useState<AreaType | null>(null);
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleClick = () => {
    if (!value) {
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
          navigate(`Layout`);
        })
        .catch(() => {});
    } else {
      navigate(`Edit/${value.value}`);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">選擇類型</Typography>
      <Typography variant="caption">
        使用預設的內容類型，讓你的主頁更加美觀，並且讓企業更容易依據內容搜尋到你的資訊!
      </Typography>

      <Stack spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"flex-end"}>
          <Autocomplete
            options={options}
            getOptionLabel={(option: AreaType) => option.value}
            value={value}
            onChange={(e: any, value: AreaType | null) => setValue(value)}
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
          <Box>
            <Button variant="outlined" onClick={() => navigate("Layout")}>
              自定義
            </Button>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography variant="body1">常見類型</Typography>
          {options.map((o, i) => (
            <Chip
              key={i}
              icon={
                value && o.value === value.value ? <CheckIcon /> : <AddIcon />
              }
              label={o.value}
              onClick={() => {
                setValue(o);
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
