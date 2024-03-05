import { Box, Divider, Stack, useTheme } from "@mui/material";
import React from "react";
import MessageItem from "../MessageItem";
import MessageModelHeader from "../MessageModelHeader";
import MessageModelInput from "../MessageModelInput";

function MessageModel() {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        height: "var(--ing-height-user-inner)",
      }}
    >
      <MessageModelHeader></MessageModelHeader>
      <Divider />
      <Stack
        spacing={1}
        sx={{
          flex: "1 1 auto",
          overflowY: "scroll",
          px: 1,
        }}
      >
        <MessageItem align="left" />
        <MessageItem align="right" />
        <MessageItem align="left" />
        <MessageItem align="left" />
        <MessageItem align="left" />
        <MessageItem align="left" />
        <MessageItem align="left" />
        <MessageItem align="left" />
      </Stack>
      <MessageModelInput />
    </Stack>
  );
}

export default MessageModel;
