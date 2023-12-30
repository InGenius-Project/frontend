import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "features/store";
import { setContent, setTitle } from "features/layout/layoutSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";
import RichTextEditor from "components/RichTextEditor";
import { EditorState, LexicalEditor } from "lexical";
import ImageCrop from "components/ImageCrop";
import AreaListItem from "../AreaListItem";
import DragDropContainer from "components/DragDropContainer";
import { v4 as uuid } from "uuid";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

const dummyListItems = [
  {
    id: uuid(),
    content: "React",
  },
  { id: uuid(), content: "UI/UX" },
];

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const layoutState = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [listItemState, setListItemState] = useState(dummyListItems);

  const handleEditorChange = (
    editorState: EditorState,
    editor: LexicalEditor
  ) => {
    dispatch(setContent(editorState));
  };

  const handleListItemDragEnd = (item: string[]) => {
    const newListItem = item
      .map((id) => listItemState.find((item) => item.id === id))
      .filter((item) => item !== undefined);

    setListItemState(newListItem as typeof dummyListItems);
  };

  const handleListAddClick = () => {
    setListItemState((state) => [
      ...state,
      {
        id: uuid(),
        content: "",
      },
    ]);
  };

  const handleListRemoveClick = (id: string) => {
    setListItemState((state) => state.filter((i) => i.id !== id));
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

        {layoutState.arrangement === LayoutArrangement.LIST && (
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <DragDropContainer
              droppableId={uuid()}
              items={listItemState.map((item) => item.id)}
              spacing={0}
              onDragEnd={handleListItemDragEnd}
            >
              {listItemState.map((i) => (
                <AreaListItem
                  content={i.content}
                  editable
                  key={i.id}
                  id={i.id}
                  onClickDelete={handleListRemoveClick}
                />
              ))}
            </DragDropContainer>
            <Button
              color="info"
              variant="text"
              sx={{
                width: "100%",
                borderRadius: "4px",
                padding: 0.2,
              }}
              onClick={handleListAddClick}
            >
              +
            </Button>
          </Box>
        )}

        {layoutState.arrangement === LayoutArrangement.IMAGETEXT && (
          <ImageCrop />
        )}

        {(layoutState.arrangement === LayoutArrangement.TEXT ||
          layoutState.arrangement === LayoutArrangement.IMAGETEXT) && (
          <RichTextEditor
            controllable
            onChange={handleEditorChange}
            initialEditorState={layoutState.content}
          />
        )}
      </Stack>
    </Paper>
  );
}
