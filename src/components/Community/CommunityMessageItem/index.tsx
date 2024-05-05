import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatMessage } from '@/types/interfaces/IChat';
import { Avatar, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

type CommunityMessageItemProps = {
  message: IChatMessage;
};

function CommunityMessageItem({ message }: CommunityMessageItemProps) {
  const m = useMemo(() => {
    return new ChatMessage(message);
  }, [message]);

  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{
        p: 1,
      }}
    >
      <Avatar />
      <Stack>
        <Typography variant="caption">{m.Sender.Username}</Typography>
        <Typography variant="body1">{m.Message}</Typography>
      </Stack>
      <Typography variant="caption">{m.getTimeDiffer()}</Typography>
    </Stack>
  );
}

export default CommunityMessageItem;
