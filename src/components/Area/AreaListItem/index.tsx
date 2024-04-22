import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type AreaListItemProps = {
  id: string;
  index?: number;
  content?: string;
  editable?: boolean;
  renderInput?: React.ReactNode;
  onClickDelete?: (id: string) => void;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaListItem({
  id,
  index,
  content,
  editable = false,
  renderInput,
  onClickDelete,
  ...props
}: AreaListItemProps) {
  const theme = useTheme();

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClickDelete && onClickDelete(id);
  };

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
      {index && (
        <ListItemAvatar>
          <Avatar>{index}</Avatar>
        </ListItemAvatar>
      )}
      {editable ? renderInput : <Typography variant="body1">{content}</Typography>}
    </ListItem>
  );
}

export default AreaListItem;
