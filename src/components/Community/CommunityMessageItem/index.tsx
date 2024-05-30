import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatMessage } from '@/types/interfaces/IChat';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { initializeState } from '@/features/layout/layoutSlice';
import RichTextEditor from '@/components/RichTextEditor';
import UserAvatar from '@/components/UserAvatar';

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
      <Box>
        <UserAvatar uri={message.Sender.Avatar?.Uri} alt={message.Sender.Username} size={'2em'} />
      </Box>
      <Stack>
        <Typography variant="caption">{m.Sender.Username}</Typography>
        <RichTextEditor initJsonString={m.Message} initMarkdownString={m.Message}></RichTextEditor>
      </Stack>
      <Typography variant="caption">{m.getTimeDiffer()}</Typography>
    </Stack>
  );
}

export default CommunityMessageItem;
