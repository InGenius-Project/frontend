import { IInnerKeyValueItem, IKeyValueItem } from '@/types/interfaces/IArea';
import { IInnerTag } from '@/types/interfaces/ITag';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  Autocomplete,
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useRef } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

const filter = createFilterOptions<IInnerTag>({});

type AreaKeyValueListItemProps = {
  id: string;
  item: IInnerKeyValueItem;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: (item: IInnerKeyValueItem) => void;
  control?: React.ReactNode;
  options?: IInnerTag[];
} & Partial<DraggableProvidedDragHandleProps>;

function AreaKeyValueListItem({
  id,
  item,
  editable = false,
  onClickDelete,
  onChange,
  options,
  control,
  ...props
}: AreaKeyValueListItemProps) {
  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClickDelete && onClickDelete(id);
  };

  return (
    <ListItem
      sx={{
        padding: 2,
        alignItems: 'flex-end',
      }}
      secondaryAction={
        editable ? (
          <Stack direction={'row'} spacing={1}>
            <IconButton onClick={handleDeleteClick}>
              <ClearIcon />
            </IconButton>
            <IconButton {...props}>
              <DragIndicatorIcon />
            </IconButton>
          </Stack>
        ) : undefined
      }
    >
      {editable ? (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flex: '1 1 auto',
            alignItems: 'flex-end',
            widht: '100%',
            pr: '88px',
          }}
        >
          <Autocomplete
            multiple
            options={options || []}
            value={(item.Key || []).map((i) => ({
              ...i,
              InnerId: uuid(),
            }))}
            filterSelectedOptions
            onChange={(_, i) => {
              onChange &&
                onChange({
                  ...item,
                  Key: i,
                });
            }}
            selectOnFocus
            handleHomeEndKeys
            getOptionLabel={(o) => o.Name}
            renderInput={(params) => <TextField {...params} variant="standard" />}
            sx={{
              flex: '1 1 10em',
            }}
          />

          <Divider orientation="vertical" flexItem />
          <TextField
            variant="standard"
            value={item.Value}
            onChange={(e) => {
              e.preventDefault();
              onChange &&
                onChange({
                  ...item,
                  Value: e.target.value,
                });
            }}
            autoFocus
            fullWidth
            sx={{ flex: '1 1 auto', height: '100%' }}
          />
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
