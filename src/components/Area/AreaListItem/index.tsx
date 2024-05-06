import { useGetTagTypeByIdQuery } from '@/features/api/tag/getTagTypeById';
import { setListIndex } from '@/features/layout/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { TagType } from '@/types/enums/TagType';
import { IInnerTag } from '@/types/interfaces/ITag';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  Autocomplete,
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { NIL } from 'uuid';

const filter = createFilterOptions<IInnerTag>();

type AreaListItemProps = {
  id: string;
  options?: IInnerTag[];
  selectOptions?: IInnerTag[];
  title?: string;
  index: number;
  content?: string;
  editable?: boolean;
  value?: IInnerTag;
  renderInput?: React.ReactNode;
  displayIndex?: boolean;
  onChange?: (value: IInnerTag, newValue: IInnerTag) => void;
  onClickDelete?: (id: string) => void;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaListItem({
  id,
  index,
  content,
  editable = false,
  selectOptions = [],
  displayIndex = false,
  onClickDelete,
  options,
  value,
  onChange,
  renderInput,
  title = '',
  ...props
}: AreaListItemProps) {
  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClickDelete && onClickDelete(id);
  };
  const layoutState = useAppSelector((state) => state.layoutState);
  const dispatch = useAppDispatch();

  const { data: customTagTypeData } = useGetTagTypeByIdQuery(TagType.Custom);

  return (
    <ListItem
      secondaryAction={
        editable ? (
          <Stack direction={'row'} spacing={1}>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={handleDeleteClick}>
              <ClearIcon />
            </IconButton>
            <IconButton {...props}>
              <DragIndicatorIcon />
            </IconButton>
          </Stack>
        ) : undefined
      }
      sx={{
        padding: 2,
      }}
    >
      {displayIndex && (
        <ListItemAvatar>
          <Avatar>{index}</Avatar>
        </ListItemAvatar>
      )}
      {editable ? (
        !renderInput ? (
          <Autocomplete
            freeSolo
            sx={{ width: '20em' }}
            options={options || []}
            renderInput={(params) => (
              <TextField {...params} variant="standard" fullWidth placeholder={`請輸入${title}`} />
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
            value={value}
            isOptionEqualToValue={(option, value) => {
              return option.Id === value.Id;
            }}
            renderOption={(props, option, state) => {
              return (
                <li
                  {...props}
                  id={`area-list-item-li-${option.Id.toString()}`}
                  key={`area-list-item-li-${option.Id.toString()}`}
                >
                  <Typography>{option.Name}</Typography>
                </li>
              );
            }}
            selectOnFocus
            handleHomeEndKeys
            onChange={(event, newValue) => {
              if (value && typeof newValue === 'object' && newValue && onChange) onChange(value, newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(
                options.filter((i) => !selectOptions.some((item) => item.Id === i.Id)),
                params,
              );

              const { inputValue } = params;
              const isExisting = options.some((option: IInnerTag) => inputValue === option.Name);
              if (inputValue !== '' && !isExisting && customTagTypeData?.result) {
                filtered.push({
                  Id: layoutState.listIndex,
                  Name: inputValue,
                  Type: customTagTypeData?.result,
                });
              }
              return filtered;
            }}
          />
        ) : (
          renderInput
        )
      ) : (
        <Typography variant="body1">{content}</Typography>
      )}
    </ListItem>
  );
}

export default AreaListItem;
