import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import isNotNullOrUndefined from "assets/utils/isNotNullorUndefined";
import DragDropContainer from "components/DragDropContainer";
import ImageCrop from "components/ImageCrop";
import RichTextEditor from "components/RichTextEditor";
import {
  selectLayoutType,
  setContent,
  setImage,
  setKetValueListItems,
  setListItem,
  setTitle,
} from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { EditorState, LexicalEditor } from "lexical";
import React from "react";
import { useNavigate } from "react-router-dom";
import { KeyValueItemDTO, LayoutTypeDTO } from "types/DTO/AreaDTO";
import { v4 as uuid } from "uuid";
import AreaKeyValueListItem from "../AreaKeyValueListItem";
import AreaListItem from "../AreaListItem";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutTypeState = useAppSelector(selectLayoutType);
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
      .map((id) => (layoutState.listItems || []).find((item) => item.Id === id))
      .filter(isNotNullOrUndefined);

    dispatch(setListItem(newListItem));
  };

  const handleKeyValueListItemDragEnd = (item: string[]) => {
    const newListItems = item
      .map((id) => layoutState.keyValueListItems.find((item) => item.Id === id))
      .filter(isNotNullOrUndefined);

    dispatch(setKetValueListItems(newListItems));
  };
  const handleKeyValueListAddClick = () => {
    // TODO: fix this
    // dispatch(
    //   setKetValueListItems([
    //     ...layoutState.keyValueListItems,
    //     {
    //       Id: uuid(),
    //       Key: {
    //         id: uuid(),
    //         name: "",
    //         type: "CUSTOM",
    //       },
    //       value: "",
    //     },
    //   ])
    // );
  };

  const handleListAddClick = () => {
    if (layoutState.listItems) {
      // TODO: fix this
      // dispatch(
      //   setListItem([
      //     ...layoutState.listItems,
      //     {
      //       id: uuid(),
      //       name: "",
      //       type: "CUSTOM",
      //     },
      //   ])
      // );
    } else {
      // dispatch(setListItem([{ id: uuid(), name: "", type: "CUSTOM" }]));
    }
  };

  const handleListRemoveClick = (id: string) => {
    dispatch(
      setListItem((layoutState.listItems || []).filter((i) => i.Id !== id))
    );
  };

  const handleKeyValueListItemChange = (item: KeyValueItemDTO) => {
    dispatch(
      setKetValueListItems(
        layoutState.keyValueListItems.map((i) => {
          if (i.Id === item.Id) {
            return item;
          }
          return i;
        })
      )
    );
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
          <Stack
            direction={"column"}
            sx={{
              flex: "1 1 auto",
            }}
            spacing={1}
          >
            <TextField
              label="標題"
              value={
                layoutState.areaType
                  ? layoutState.areaType.Name
                  : layoutState.title
              }
              onChange={(event) => dispatch(setTitle(event.target.value))}
              disabled={!!layoutState.areaType}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="caption">
              {layoutState.areaType ? layoutState.areaType.Description : ""}
            </Typography>
          </Stack>
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

        {/* Image */}
        {layoutTypeState === LayoutTypeDTO.ImageText && (
          <ImageCrop
            height={150}
            width={150}
            image={layoutState.image}
            onChange={(image) => dispatch(setImage(image))}
          />
        )}

        {/* Text */}
        {(layoutTypeState === LayoutTypeDTO.Text ||
          layoutTypeState === LayoutTypeDTO.ImageText) && (
          <RichTextEditor
            controllable
            onChange={handleEditorChange}
            initialEditorState={layoutState.content}
          />
        )}

        {/* Key value list */}
        {layoutTypeState === LayoutTypeDTO.KeyValueList && (
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <DragDropContainer
              droppableId={uuid()}
              items={layoutState.keyValueListItems.map((item) => item.Id)}
              spacing={0}
              onDragEnd={handleKeyValueListItemDragEnd}
            >
              {layoutState.keyValueListItems.map((item) => (
                <AreaKeyValueListItem
                  id={item.Id}
                  itemKey={item.Key}
                  value={item.Value}
                  key={item.Id}
                  editable
                  onChange={handleKeyValueListItemChange}
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
        {layoutTypeState === LayoutTypeDTO.List && (
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <DragDropContainer
              droppableId={uuid()}
              items={(layoutState.listItems || []).map((item) => item.Id)}
              spacing={0}
              onDragEnd={handleListItemDragEnd}
            >
              {(layoutState.listItems || []).map((i) => (
                <AreaListItem
                  content={i.Name}
                  editable
                  key={i.Id}
                  id={i.Id}
                  onClickDelete={handleListRemoveClick}
                  onChange={(event) =>
                    dispatch(
                      setListItem(
                        (layoutState.listItems || []).map((item) => {
                          if (item.Id === i.Id)
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
