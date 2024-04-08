import isNotNullOrUndefined from '@/assets/utils/isNotNullorUndefined';
import DragDropContainer from '@/components/DragDropContainer';
import ImageCrop from '@/components/ImageCrop';
import RichTextEditor from '@/components/RichTextEditor';
import { useGetAreaTypeByIdQuery } from '@/features/api/area/getAreaTypeById';
import { useGetTagTypeByIdQuery } from '@/features/api/tag/getTagTypeById';
import { useGetTagsQuery } from '@/features/api/tag/getTags';
import {
  pushKeyValueListItem,
  pushListItem,
  selectLayoutTitle,
  selectLayoutType,
  setContent,
  setImage,
  setKetValueListItems,
  setListItem,
  setTitle,
  updateKeyValueListItem,
  updateListItem,
} from '@/features/layout/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { IInnerKeyValueItem } from '@/types/interfaces/IArea';
import { IInnerTag } from '@/types/interfaces/ITag';
import { Autocomplete, Box, Button, Stack, TextField, Typography, createFilterOptions, useTheme } from '@mui/material';
import { EditorState, LexicalEditor } from 'lexical';
import React, { useEffect } from 'react';
import { NIL, v4 as uuid } from 'uuid';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';

type AreaEditItemProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

const filter = createFilterOptions<IInnerTag>();

export default function AreaEditItem({ onAddClick, loading }: AreaEditItemProps) {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutTypeState = useAppSelector(selectLayoutType);
  const layoutTitle = useAppSelector(selectLayoutTitle);
  const { data: areaTypeData } = useGetAreaTypeByIdQuery(layoutState.areaTypeId!, {
    skip: !layoutState.areaTypeId,
  });
  const listTagTypes = areaTypeData?.result?.ListTagTypes ?? [];
  const { data: tagsData } = useGetTagsQuery(
    listTagTypes.map((l) => l.Id.toString()),
    {
      skip: !(listTagTypes.length > 0),
    },
  );

  const { data: customTagTypeData } = useGetTagTypeByIdQuery('1');
  const theme = useTheme();

  useEffect(() => {
    if (areaTypeData?.result) {
      dispatch(setTitle(areaTypeData.result.Name));
    }
  }, [areaTypeData?.result, dispatch]);

  const handleEditorChange = (updateJsonString: string) => {
    dispatch(setContent(updateJsonString));
  };

  // #region KeyValueList event

  const handleKeyValueListItemDragEnd = (item: string[]) => {
    const newListItems = item
      .map((id) => layoutState.keyValueListItems.find((item) => item.InnerId === id))
      .filter(isNotNullOrUndefined);

    dispatch(setKetValueListItems(newListItems));
  };

  const handleKeyValueListItemChange = (item: IInnerKeyValueItem) => {
    dispatch(updateKeyValueListItem(item));
  };

  const handleKeyValueListAddClick = () => {
    dispatch(
      pushKeyValueListItem({
        Id: NIL,
        InnerId: uuid(),
        Value: '',
      }),
    );
  };
  // #endregion

  // #region List event

  const handleListAddClick = () => {
    // set empty item
    if (customTagTypeData?.result) {
      dispatch(
        pushListItem({
          InnerId: NIL,
          Id: NIL,
          Name: '',
          Type: customTagTypeData.result,
        }),
      );
    }
  };

  const handleListItemDragEnd = (item: string[]) => {
    const newListItem = item
      .map((id) => (layoutState.listItems || []).find((item) => item.Id === id))
      .filter(isNotNullOrUndefined);

    dispatch(setListItem(newListItem));
  };

  const handleListRemoveClick = (id: string) => {
    dispatch(setListItem((layoutState.listItems || []).filter((i) => i.InnerId !== id)));
  };

  const handleListItemChange = (event: React.SyntheticEvent<Element, Event>, value: string | IInnerTag | null) => {
    if (typeof value === 'object' && value) {
      dispatch(updateListItem(value));
    } else if (typeof value === 'string' && customTagTypeData?.result) {
      dispatch(
        updateListItem({
          InnerId: uuid(),
          Id: NIL,
          Name: value,
          Type: customTagTypeData.result,
        }),
      );
    }
  };

  // #endregion

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          gap: 1,
        }}
      >
        <Stack
          direction={'column'}
          sx={{
            flex: '1 1 auto',
          }}
          spacing={1}
        >
          {layoutState.areaTypeId !== null ? (
            <Typography variant="h4">編輯{layoutTitle}</Typography>
          ) : (
            <TextField
              label="標題"
              value={layoutState.title}
              onChange={(event) => dispatch(setTitle(event.target.value))}
              disabled={!!layoutState.areaTypeId}
              fullWidth
              sx={{ flexGrow: 1 }}
            />
          )}
          <Typography variant="caption">{areaTypeData ? areaTypeData.result?.Description : ''}</Typography>
        </Stack>
      </Box>

      {/* Image */}
      {layoutTypeState === LayoutType.ImageText && (
        <ImageCrop
          height={150}
          width={150}
          image={layoutState.image}
          onCropDone={(image) => dispatch(setImage(image))}
        />
      )}

      {/* Text */}
      {(layoutTypeState === LayoutType.Text || layoutTypeState === LayoutType.ImageText) && (
        <RichTextEditor controllable onChange={handleEditorChange} initJsonString={layoutState.content} />
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
            items={layoutState.keyValueListItems.map((item) => item.InnerId)}
            spacing={0}
            onDragEnd={handleKeyValueListItemDragEnd}
          >
            {layoutState.keyValueListItems.map(({ InnerId, ...item }) => (
              <AreaKeyValueListItem
                id={InnerId}
                key={InnerId}
                item={item}
                keyOptions={tagsData && tagsData.result ? tagsData.result : []}
                editable
                onChange={(i) => handleKeyValueListItemChange({ InnerId, ...i })}
              />
            ))}
          </DragDropContainer>
          <Button
            color="info"
            variant="text"
            sx={{
              width: '100%',
              borderRadius: '4px',
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
            items={(layoutState.listItems || []).map((item) => item.InnerId)}
            spacing={0}
            onDragEnd={handleListItemDragEnd}
          >
            {layoutState.listItems &&
              layoutState.listItems.map((i) => (
                <AreaListItem
                  content={i.Name}
                  editable
                  key={i.InnerId}
                  id={i.InnerId}
                  onClickDelete={handleListRemoveClick}
                  renderInput={
                    <Autocomplete
                      sx={{ width: '20em' }}
                      freeSolo
                      options={
                        tagsData && tagsData.result
                          ? tagsData.result.map((t: any) => ({
                              ...t,
                              InnerId: i.InnerId,
                            }))
                          : []
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          fullWidth
                          placeholder={`請輸入${layoutState.title}`}
                        />
                      )}
                      getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                          return option;
                        }
                        if (option.Name) {
                          return option.Name;
                        }
                        return '';
                      }}
                      value={i}
                      isOptionEqualToValue={(option, value) => {
                        return option.InnerId === value.InnerId;
                      }}
                      selectOnFocus
                      handleHomeEndKeys
                      onChange={handleListItemChange}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option: IInnerTag) => inputValue === option.Name);
                        if (inputValue !== '' && !isExisting && customTagTypeData?.result) {
                          filtered.push({
                            InnerId: uuid(),
                            Id: NIL,
                            Name: inputValue,
                            Type: customTagTypeData?.result,
                          });
                        }

                        return filtered;
                      }}
                    />
                  }
                />
              ))}
          </DragDropContainer>
          <Button
            color="info"
            variant="text"
            sx={{
              width: '100%',
              borderRadius: '4px',
              padding: 0.2,
            }}
            onClick={handleListAddClick}
          >
            +
          </Button>
        </Box>
      )}
    </Stack>
  );
}
