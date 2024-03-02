import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import isNotNullOrUndefined from "assets/utils/isNotNullorUndefined";
import DragDropContainer from "components/DragDropContainer";
import ImageCrop from "components/ImageCrop";
import RichTextEditor from "components/RichTextEditor";
import {
  pushListItem,
  selectLayoutType,
  setContent,
  setImage,
  setKetValueListItems,
  setListItem,
  setTitle,
  updateListItem,
} from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { EditorState, LexicalEditor } from "lexical";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutType } from "types/enums/LayoutType";
import { IKeyValueItem } from "types/interfaces/IArea";
import { v4 as uuid } from "uuid";
import AreaKeyValueListItem from "../AreaKeyValueListItem";
import AreaListItem from "../AreaListItem";
import { useGetAreaTypeByIdQuery } from "features/api/area/getAreaTypeById";
import { useLazyGetAreaTypesQuery } from "features/api/area/getAreaTypes";
import { useGetTagTypeByIdQuery, useLazyGetTagTypeByIdQuery } from "features/api/tag/getTagTypeById";
import { ITag } from "types/interfaces/ITag";
import { useGetTagTypesQuery } from "features/api/tag/getTagTypes";
import { custom } from "zod";

type AreaEditModelProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

const filter = createFilterOptions<ITag>();

export default function AreaEditModel({
  onAddClick,
  loading,
}: AreaEditModelProps) {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutTypeState = useAppSelector(selectLayoutType);
  const { data: areaTypeData } = useGetAreaTypeByIdQuery(
    layoutState.areaTypeId!,
    {
      skip: !layoutState.areaTypeId,
    }
  );
  const [getListTags, { data: listTags }] = useLazyGetTagTypeByIdQuery()
  const { data: customTagTypeData } = useGetTagTypeByIdQuery("1");
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
    if(areaTypeData?.result && areaTypeData.result.ListTagTypes.length > 0)
      getListTags(areaTypeData.result.ListTagTypes[0].Id.toString() || "")
    
    // set empty item
    if (customTagTypeData?.result) {
      dispatch(
        setListItem([{
          Id: uuid(),
          Name: "",
          Type: customTagTypeData.result
        }])
      )
    }
  };

  const handleListRemoveClick = (id: string) => {
    dispatch(
      setListItem((layoutState.listItems || []).filter((i) => i.Id !== id))
    );
  };

  const handleKeyValueListItemChange = (item: IKeyValueItem) => {
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

  const handleListItemChange = (event: React.SyntheticEvent<Element, Event>, value: string | ITag | null) => {
    var foundListItem = layoutState.listItems?.find((item) => item.Id === value);
    if (foundListItem) {
      if (typeof value === "object" && value)
        dispatch(updateListItem(value));
     }
    else {
        if(typeof value === "string" && customTagTypeData?.result)
          dispatch(pushListItem({
            Id: uuid(),
            Name: value,
            Type: customTagTypeData.result,
          }))
        if(typeof value === "object" && value)
          dispatch(pushListItem(value))
    }
  }


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
              value={layoutState.title}
              onChange={(event) => dispatch(setTitle(event.target.value))}
              disabled={!!layoutState.areaTypeId}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="caption">
              {areaTypeData ? areaTypeData.result?.Description : ""}
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
        {layoutTypeState === LayoutType.ImageText && (
          <ImageCrop
            height={150}
            width={150}
            image={layoutState.image}
            onChange={(image) => dispatch(setImage(image))}
          />
        )}

        {/* Text */}
        {(layoutTypeState === LayoutType.Text ||
          layoutTypeState === LayoutType.ImageText) && (
          <RichTextEditor
            controllable
            onChange={handleEditorChange}
            initialEditorState={layoutState.content}
          />
        )}

        {/* Key value list */}
        {layoutTypeState === LayoutType.KeyValueList && (
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
        {layoutTypeState === LayoutType.List && (
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
                  
                  renderInput={
                    <Autocomplete
                      sx={{width: "20em"}}
                      freeSolo
                      options={listTags?.result ? listTags.result.Tags : []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          fullWidth
                        />
                      )}
                      getOptionLabel={(option) => {
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option.Name) {
                          return option.Name;
                        }
                        return "";
                      }}
                      isOptionEqualToValue={(option, value) => {
                        return option.Id === value.Id;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      value={i}
                      onChange={handleListItemChange}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option: ITag) => inputValue === option.Name);
                        if (inputValue !== '' && !isExisting && customTagTypeData?.result) {
                          filtered.push({
                            Id: uuid(),
                            Name: `Add "${inputValue}"`,
                            Type: customTagTypeData?.result
                          });
                        }
                        
                        return filtered;
            
                      }}
                    />}
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
