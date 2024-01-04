import {
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ClearIcon from "@mui/icons-material/Clear";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

type AreaListItemProps = {
  id: string;
  content?: string;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaListItem({
  id,
  content,
  editable = false,
  onClickDelete,
  onChange,
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
          <Stack direction={"row"} spacing={1}>
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
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: 2,
        borderRadius: "var(--ing-shape-borderRadius)",
      }}
    >
      {editable ? (
        <TextField
          variant="standard"
          defaultValue={content}
          onChange={onChange}
        />
      ) : (
        <Typography variant="body1">{content}</Typography>
      )}
    </ListItem>
  );
}

export default AreaListItem;
