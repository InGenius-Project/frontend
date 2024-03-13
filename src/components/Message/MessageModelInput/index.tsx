import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

function MessageModelInput() {
  return (
    <Stack spacing={1}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Stack direction={"row"} spacing={1}>
        <IconButton>
          <ImageIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default MessageModelInput;
