import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useHotkeys } from 'react-hotkeys-hook';

type MessageModelInputProps = {
  onSend?: (message: string) => void;
};

function MessageModelInput({ onSend }: MessageModelInputProps) {
  const [message, setMessage] = useState('');

  useHotkeys('ctrl+enter', () => {
    onSend && onSend(message);
  });

  return (
    <Stack spacing={1}>
      <TextField
        value={message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => {
                  onSend && onSend(message);
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Stack direction={'row'} spacing={1}>
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
