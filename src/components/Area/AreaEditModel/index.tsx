import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "features/store";
import { setTitle } from "features/layout/layoutSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { LayoutType } from "types/DTO/AreaDTO";
import RichTextEditor from "components/RichTextEditor";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const areaState = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Paper sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            gap: 1,
          }}
        >
          <TextField
            label="標題"
            value={areaState.title}
            onChange={(event) => dispatch(setTitle(event.target.value))}
            disabled={areaState.type !== LayoutType.CUSTOM ? true : false} // disabled if area type is not custom
            fullWidth
            sx={{ flexGrow: 1 }}
          />

          <Box sx={{ whiteSpace: "nowrap" }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              上一步
            </Button>
          </Box>
          <Box>
            <LoadingButton
              variant="contained"
              onClick={onAddClick}
              loading={loading}
            >
              新增
            </LoadingButton>
          </Box>
        </Box>
        <Typography variant="h4">內容</Typography>
        <RichTextEditor controllable />

        {/* 
        {areaState.arrangement === LayoutArrangement.TEXT && (
          <ReactQuill
            theme="snow"
            value={areaState.content}
            onChange={handleContentChange}
          />
        )} */}
      </Stack>
    </Paper>
  );
}
