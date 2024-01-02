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
import {
  ListItem,
  setContent,
  setKetValueListItems,
  setListItem,
  setTitle,
} from "features/layout/layoutSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";
import RichTextEditor from "components/RichTextEditor";
import { EditorState, LexicalEditor } from "lexical";
import ImageCrop from "components/ImageCrop";
import AreaListItem from "../AreaListItem";
import DragDropContainer from "components/DragDropContainer";
import { v4 as uuid } from "uuid";
import isNotNullOrUndefined from "assets/utils/isNotNullorUndefined";
import AreaKeyValueListItem from "../AreaKeyValueListItem";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

const dummyListItems: ListItem[] = [
  {
    id: uuid(),
    name: "React",
  },
  { id: uuid(), name: "UI/UX" },
];

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleEditorChange = (
    editorState: EditorState,
    editor: LexicalEditor
  ) => {
    dispatch(setContent(editorState));
  };

  const handleListItemDragEnd = (item: string[]) => {
    const newListItem = item
      .map((id) => layoutState.listItems.find((item) => item.id === id))
      .filter(isNotNullOrUndefined);

    dispatch(setListItem(newListItem));
  };

  const handleKeyValueListItemDragEnd = (item: string[]) => {
    const newListItems = item
      .map((id) => layoutState.keyValueListItems.find((item) => item.id === id))
      .filter(isNotNullOrUndefined);

    dispatch(setKetValueListItems(newListItems));
  };
  const handleKeyValueListAddClick = () => {
    dispatch(
      setKetValueListItems([
        ...layoutState.keyValueListItems,
        {
          id: uuid(),
          key: "",
          value: "",
        },
      ])
    );
  };

  const handleListAddClick = () => {
    dispatch(
      setListItem([
        ...layoutState.listItems,
        {
          id: uuid(),
          name: "",
        },
      ])
    );
  };

  const handleListRemoveClick = (id: string) => {
    dispatch(setListItem(layoutState.listItems.filter((i) => i.id !== id)));
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

        {/* Text */}
        {(layoutState.arrangement === LayoutArrangement.TEXT ||
          layoutState.arrangement === LayoutArrangement.IMAGETEXT) && (
          <RichTextEditor
            controllable
            onChange={handleEditorChange}
            initialEditorState={layoutState.content}
          />
        )}

        {/* Image */}
        {layoutState.arrangement === LayoutArrangement.IMAGETEXT && (
          <ImageCrop />
        )}

        {/* Key value list */}
        {layoutState.arrangement === LayoutArrangement.KEYVALUELIST && (
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <DragDropContainer
              droppableId={uuid()}
              items={layoutState.keyValueListItems.map((item) => item.id)}
              spacing={0}
              onDragEnd={handleKeyValueListItemDragEnd}
            >
              {layoutState.keyValueListItems.map((item) => (
                <AreaKeyValueListItem
                  id={item.id}
                  itemKey={item.key}
                  value={item.value}
                  key={item.id}
                  editable
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
              onClick={handleKeyValueListAddClick}
            >
              +
            </Button>
          </Box>
        )}

        {/* List */}
        {layoutState.arrangement === LayoutArrangement.LIST && (
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <DragDropContainer
              droppableId={uuid()}
              items={layoutState.listItems.map((item) => item.id)}
              spacing={0}
              onDragEnd={handleListItemDragEnd}
            >
              {layoutState.listItems.map((i) => (
                <AreaListItem
                  content={i.name}
                  editable
                  key={i.id}
                  id={i.id}
                  onClickDelete={handleListRemoveClick}
                  onChange={(event) =>
                    dispatch(
                      setListItem(
                        layoutState.listItems.map((item) => {
                          if (item.id === i.id)
                            return { ...item, name: event.target.value };
                          return item;
                        })
                      )
                    )
                  }
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
      </Stack>
    </Paper>
  );
}
