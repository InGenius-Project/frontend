import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
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
  itemKey?: string;
  value?: string;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaListItem({
  id,
  itemKey: key = "",
  value = "",
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
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: 2,
        borderRadius: "var(--ing-shape-borderRadius)",
      }}
    >
      {editable ? (
        <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
          <TextField
            variant="standard"
            defaultValue={key}
            onChange={onChange}
          />
          <Divider orientation="vertical" flexItem />
          <TextField
            variant="standard"
            defaultValue={value}
            onChange={onChange}
            sx={{ flex: "1 1 auto" }}
          />
          <Stack direction={"row"} spacing={1}>
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
        <Stack spacing={1} direction={"row"}>
          <Typography variant="body1">{key}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">{value}</Typography>
        </Stack>
      )}
    </ListItem>
  );
}

export default AreaListItem;
