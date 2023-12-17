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
import { setContent, setTitle } from "features/layout/layoutSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { LayoutType } from "types/DTO/AreaDTO";
import RichTextEditor from "components/RichTextEditor";
import { EditorState, LexicalEditor } from "lexical";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const layoutState = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditorChange = (
    editorState: EditorState,
    editor: LexicalEditor
  ) => {
    dispatch(setContent(editorState));
  };

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
            value={layoutState.title}
            onChange={(event) => dispatch(setTitle(event.target.value))}
            disabled={layoutState.type !== LayoutType.CUSTOM ? true : false} // disabled if area type is not custom
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

        <RichTextEditor
          controllable
          onChange={handleEditorChange}
          initialEditorState={layoutState.content}
        />
      </Stack>
    </Paper>
  );
}
