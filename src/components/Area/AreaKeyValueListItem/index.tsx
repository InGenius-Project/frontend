import { IKeyValueItem } from '@/types/interfaces/IArea';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type AreaKeyValueListItemProps = {
  id: string;
  item: IKeyValueItem;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  control?: React.ReactNode;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaKeyValueListItem({
  id,
  item,
  editable = false,
  onClickDelete,
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
    >
      {editable ? (
        control
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
