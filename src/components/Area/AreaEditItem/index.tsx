import UnsplashIcon from '@/assets/images/svg/unsplash.svg?react';
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
  selectLayoutImage,
  selectLayoutTitle,
  selectLayoutType,
  setContent,
  setImage,
  setImageType,
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
import { Box, Button, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { NIL, v4 as uuid } from 'uuid';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';
import AreaUnsplashImageModal from '../AreaUnsplashImageModal';

type AreaEditItemProps = {
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export default function AreaEditItem({ onAddClick, loading }: AreaEditItemProps) {
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutImage = useAppSelector(selectLayoutImage);
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
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const [upsplashModalOpen, setUpsplashModalOpen] = React.useState(false);
  const handleUpsplashModalOpen = () => setUpsplashModalOpen(true);
  const handleUpsplashClose = () => setUpsplashModalOpen(false);

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

  const handleKeyValueLitRemove = (id: string) => {
    dispatch(setKetValueListItems((layoutState.keyValueListItems || []).filter((i) => i.InnerId !== id)));
  };
  // #endregion

  // #region List event

  const handleListAddClick = () => {
    // set empty item
    if (customTagTypeData?.result) {
      dispatch(
        pushListItem({
          Id: layoutState.listIndex,
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
    console.log(id);
    dispatch(setListItem((layoutState.listItems || []).filter((i) => i.Id !== id)));
  };

  const handleListItemChange = (value: IInnerTag, newValue: IInnerTag) => {
    if (typeof value === 'object' && value) {
      dispatch(setListItem((layoutState.listItems || []).map((i) => (i.Id === value.Id ? newValue : i))));
    }
  };

  // #endregion

  return (
    <Stack spacing={2}>
      {isMobile && (
        <>
          <Typography variant="h5">編輯內容</Typography>
        </>
      )}

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
        <Stack direction="row" spacing={1} alignItems={'flex-end'}>
          <Box width={150} height={150}>
            <ImageCrop
              width={150}
              height={150}
              image={layoutImage}
              onCropDone={(image) => {
                dispatch(setImage(image));
                dispatch(setImageType('blob'));
              }}
            />
          </Box>
          <Box>
            <Button onClick={handleUpsplashModalOpen} startIcon={<UnsplashIcon />} variant="outlined">
              Upsplash
            </Button>
          </Box>
          <AreaUnsplashImageModal
            open={upsplashModalOpen}
            onClose={handleUpsplashClose}
            onChange={(image) => {
              dispatch(
                setImage({
                  Id: image.id,
                  Uri: image.urls.small,
                  AltContent: image.alt_description,
                }),
              );
              dispatch(setImageType('uri'));
              handleUpsplashClose();
            }}
          />
        </Stack>
      )}

      {/* Text */}
      {(layoutTypeState === LayoutType.Text || layoutTypeState === LayoutType.ImageText) && (
        <RichTextEditor
          controllable
          onChange={handleEditorChange}
          initJsonString={layoutState.content}
          initMarkdownString={layoutState.content}
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
            items={layoutState.keyValueListItems.map((item) => item.InnerId)}
            spacing={0}
            onDragEnd={handleKeyValueListItemDragEnd}
          >
            {layoutState.keyValueListItems.map((item) => (
              <AreaKeyValueListItem
                id={item.InnerId}
                key={item.InnerId}
                item={item}
                options={
                  tagsData?.result
                    ? tagsData.result.map((t) => ({
                        ...t,
                        InnerId: uuid(),
                      }))
                    : []
                }
                editable
                onClickDelete={handleKeyValueLitRemove}
                onChange={handleKeyValueListItemChange}
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
            items={layoutState.listItems?.map((i) => i.Id.toString()) || []}
            spacing={0}
            onDragEnd={handleListItemDragEnd}
          >
            {layoutState.listItems &&
              layoutState.listItems.map((i, index) => (
                <AreaListItem
                  index={index}
                  options={tagsData?.result || []}
                  value={i}
                  selectOptions={layoutState.listItems || []}
                  onChange={handleListItemChange}
                  title={layoutState.title}
                  content={i.Name}
                  editable
                  key={`area-list-item-${i.Id.toString()}`}
                  id={i.Id.toString()}
                  onClickDelete={handleListRemoveClick}
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
