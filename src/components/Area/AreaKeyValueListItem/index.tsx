import { IKeyValueItem } from '@/types/interfaces/IArea';
import { ITag } from '@/types/interfaces/ITag';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Autocomplete, Divider, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type AreaKeyValueListItemProps = {
  id: string;
  item: IKeyValueItem;
  keyOptions?: Array<ITag>;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: (item: IKeyValueItem) => void;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaKeyValueListItem({
  item,
  keyOptions,
  editable = false,
  onClickDelete,
  onChange,
  ...props
}: AreaKeyValueListItemProps) {
  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClickDelete && onClickDelete(item.Id);
  };

  const handleKeyChange = (event: React.ChangeEvent<{}>, value: ITag[] | null) => {
    onChange &&
      onChange({
        ...item,
        Key: value || undefined,
      });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange &&
      onChange({
        ...item,
        Value: event.target.value,
      });
  };

  return (
    <ListItem
      sx={{
        padding: 2,
      }}
    >
      {editable ? (
        <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
          <Autocomplete
            options={keyOptions || []}
            multiple
            onChange={handleKeyChange}
            getOptionLabel={(o) => o.Name}
            renderInput={(params) => <TextField {...params} variant="standard" />}
            sx={{
              flex: '1 1 5em',
            }}
          />

          <Divider orientation="vertical" flexItem />
          <TextField
            variant="standard"
            defaultValue={item.Value}
            onChange={handleValueChange}
            sx={{ flex: '1 1 auto' }}
          />
          <Stack direction={'row'} spacing={1}>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={handleDeleteClick}>
              <ClearIcon />
            </IconButton>
            <IconButton {...props} tabIndex={-1}>
              <DragIndicatorIcon />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={1} direction={'row'}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              minWidth: '5em',
            }}
          >
            {item.Key?.map((k) => k.Name).join(', ')}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">{item.Value}</Typography>
        </Stack>
      )}
    </ListItem>
  );
}

export default AreaKeyValueListItem;
