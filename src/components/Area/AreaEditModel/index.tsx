import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppSelector } from "features/store";
import { LayoutType } from "types/DTO/ResumeDTO";
import { usePostResumeAreaMutation } from "features/api/resume/resume";
import { useParams } from "react-router-dom";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AreaEditModel({ onAddClick }: AreaEditModelProps) {
  const areaState = useAppSelector((state) => state.areaState);
  const [value, setValue] = React.useState("");

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
            disabled={areaState.type !== LayoutType.CUSTOM ? true : false} // disabled if area type is not custom
            fullWidth
            sx={{ flexGrow: 1 }}
          />

          <Box sx={{ whiteSpace: "nowrap" }}>
            <Button variant="outlined">上一步</Button>
          </Box>
          <Box>
            <Button variant="contained" onClick={onAddClick}>
              新增
            </Button>
          </Box>
        </Box>
        <Typography variant="h4">內容</Typography>

        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Stack>
    </Paper>
  );
}
