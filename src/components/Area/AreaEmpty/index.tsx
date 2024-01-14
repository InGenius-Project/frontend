import { Box, Button, Stack, Typography } from "@mui/material";
import { setType } from "features/layout/layoutSlice";
import { useAppDispatch } from "features/store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutType } from "types/DTO/AreaDTO";

function AreaEmpty() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  return (
    <Stack spacing={1} direction={"row"}>
      <Typography variant="h5">暫無區塊</Typography>
      <Box>
        <Button onClick={handleAddClick} variant="text">
          + 按此新增區塊
        </Button>
      </Box>
    </Stack>
  );
}

export default AreaEmpty;
