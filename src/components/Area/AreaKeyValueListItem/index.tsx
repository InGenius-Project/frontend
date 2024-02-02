import ClearIcon from "@mui/icons-material/Clear";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Divider,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { KeyValueItemDTO } from "types/DTO/AreaDTO";
import { TagDTO } from "types/TagDTO";
import { v4 as uuid } from "uuid";

type AreaListItemProps = {
  id: string;
  itemKey?: TagDTO;
  value?: string;
  editable?: boolean;
  onClickDelete?: (id: string) => void;
  onChange?: (item: KeyValueItemDTO) => void;
} & Partial<DraggableProvidedDragHandleProps>;

function AreaListItem({
  id,
  itemKey,
  value = "",
  editable = false,
  onClickDelete,
  onChange,
  ...props
}: AreaListItemProps) {
  const theme = useTheme();
  const [itemState, setItemState] = useState<KeyValueItemDTO>();

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
            defaultValue={itemKey ? itemKey.Name : undefined}
            onChange={(event) => {
              //TODO: fix this
              // setItemState((state) => ({
              //   ...state,
              //   Key: {
              //     ...state.key,
              //     name: event.target.value,
              //   },
              // }));
              // onChange && onChange(itemState);
            }}
          />
          <Divider orientation="vertical" flexItem />
          <TextField
            variant="standard"
            defaultValue={value}
            onChange={(event) => {
              //TODO: fix this
              // setItemState((state) => ({
              //   ...state,
              //   value: event.target.value,
              // }));
              // onChange && onChange(itemState);
            }}
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
          <Typography variant="body1">{itemKey?.Name}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">{value}</Typography>
        </Stack>
      )}
    </ListItem>
  );
}

export default AreaListItem;
