import WarningIcon from "@mui/icons-material/Warning";
import { ButtonBase, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function AreaEmpty() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    navigate("New");
  };

  return (
    <Stack spacing={1} direction={"row"}>
      <ButtonBase
        sx={{
          padding: 3,
          position: "relative",
          width: "100%",
        }}
        component={"button"}
        onClick={handleAddClick}
      >
        <WarningIcon
          sx={{ fontSize: "2em", color: theme.palette.primary.main, mr: 2 }}
        />
        <Typography
          variant="body1"
          sx={{ color: theme.palette.primary.main }}
          fontWeight={"bold"}
        >
          喔歐，這裡似乎還沒有資料可以顯示呢，快去新增一些資料，讓個人首頁變得更豐富吧～
        </Typography>
      </ButtonBase>
    </Stack>
  );
}

export default AreaEmpty;
