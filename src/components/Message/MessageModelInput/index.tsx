import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';
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
    <Stack
      spacing={1}
      sx={{
        width: '100%',
      }}
    >
      <TextField
        fullWidth
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setMessage('');
            onSend && onSend(message);
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <Stack direction={'row'} spacing={1}>
        <IconButton>
          <ImageIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      </Stack> */}
    </Stack>
  );
}

export default MessageModelInput;
