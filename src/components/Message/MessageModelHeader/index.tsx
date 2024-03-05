import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

function MessageModelHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Avatar />
      <Stack
        spacing={1}
        sx={{
          flex: "1 1 auto",
        }}
      >
        <Typography variant="body1">Username</Typography>
        <Typography variant="caption">Intern</Typography>
      </Stack>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}

export default MessageModelHeader;
